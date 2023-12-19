import { format } from 'date-fns';
import prismaClient from 'lib/app/prisma-client';
import { createDailyGoalsValidationSchema } from 'lib/validation/dailyGoalsValidationSchema';
import { checkUserExist } from './user';
import { validation } from '../validation';
import { BodyDailyGoals } from 'types/DailyGoals';

export const getDailyGoals = async (userId: string, date: string) => {
    await checkUserExist(userId);

    const dailyGoals = await prismaClient.dailyGoals.findFirst({
        where: { userId, dateTime: { lte: new Date(date) } },
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
    const dataValid = await validation(createDailyGoalsValidationSchema.validate(body));

    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const dailyGoals = await prismaClient.dailyGoals.findFirst({ where: { userId, dateTime: new Date(currentDate) } });
    if (dailyGoals) {
        return await prismaClient.dailyGoals.update({
            where: { id: dailyGoals.id },
            data: dataValid,
        });
    }

    return await prismaClient.dailyGoals.create({ data: { ...dataValid, userId, dateTime: new Date(currentDate) } });
};
