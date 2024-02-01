import prismaClient from 'lib/app/prisma-client';
import { createDailyGoalsValidationSchema } from 'lib/validation/dailyGoalsValidationSchema';
import { checkUserExist } from './user';
import { validation } from '../validation';
import { BodyDailyGoals } from 'types/DailyGoals';
import { format } from 'date-fns';

export const getDailyGoalsByDateRange = async (userId: string, startDate: string, endDate: string) => {
    await checkUserExist(userId);

    const dailyGoals = await prismaClient.dailyGoals.findMany({
        where: { userId, dateTime: { gte: new Date(startDate), lte: new Date(endDate) } },
        orderBy: {
            dateTime: 'asc',
        },
        select: {
            kcal: true,
            protein: true,
            fat: true,
            carbs: true,
            dateTime: true,
        },
    });

    const firstDate = dailyGoals.find(
        ({ dateTime }) => format(dateTime, 'yyyy-MM-dd') === format(new Date(startDate), 'yyyy-MM-dd'),
    );
    const lastDate = dailyGoals.find(
        ({ dateTime }) => format(dateTime, 'yyyy-MM-dd') === format(new Date(endDate), 'yyyy-MM-dd'),
    );

    if (!firstDate) {
        const firstGoal = await getDailyGoals(userId, startDate);

        if (!lastDate) {
            const lastGoal = await getDailyGoals(userId, endDate);
            return [
                { ...firstGoal, dateTime: new Date(startDate) },
                { ...lastGoal, dateTime: new Date(endDate) },
                ...dailyGoals,
            ].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
        }

        return [{ ...firstGoal, dateTime: new Date(startDate) }, ...dailyGoals].sort(
            (a, b) => a.dateTime.getTime() - b.dateTime.getTime(),
        );
    }
    if (!lastDate) {
        const goal = await getDailyGoals(userId, endDate);
        return [{ ...goal, dateTime: new Date(endDate) }, ...dailyGoals].sort(
            (a, b) => a.dateTime.getTime() - b.dateTime.getTime(),
        );
    }

    return dailyGoals;
};

export const getDailyGoals = async (userId: string, date: string) => {
    await checkUserExist(userId);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const dailyGoals = await prismaClient.dailyGoals.findFirst({
        where: { userId, dateTime: { lte: endDate } },
        orderBy: {
            dateTime: 'desc',
        },
        select: {
            kcal: true,
            protein: true,
            fat: true,
            carbs: true,
        },
    });

    if (!dailyGoals) {
        const dailyGoals = await prismaClient.dailyGoals.findFirst({
            where: { userId },
            orderBy: {
                dateTime: 'asc',
            },
            select: {
                kcal: true,
                protein: true,
                fat: true,
                carbs: true,
            },
        });

        return dailyGoals;
    }

    return dailyGoals;
};

export const changeDailyGoals = async (userId: string, body: BodyDailyGoals) => {
    await checkUserExist(userId);
    const data = await validation(createDailyGoalsValidationSchema.validate(body));

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const dailyGoals = await prismaClient.dailyGoals.findFirst({
        where: { userId, dateTime: { gte: startDate, lte: endDate } },
    });
    if (dailyGoals) {
        return await prismaClient.dailyGoals.update({
            where: { id: dailyGoals.id },
            data,
        });
    }

    return await prismaClient.dailyGoals.create({ data: { ...data, userId } });
};
