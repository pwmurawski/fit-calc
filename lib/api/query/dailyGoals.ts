import { HttpStatusCode } from 'axios';
import { format } from 'date-fns';
import prismaClient from 'lib/app/prisma-client';
import { createDailyGoalsValidationSchema } from 'lib/validation/createDailyGoalsValidationSchema';
import { ApiError } from 'next/dist/server/api-utils';
import { BodyDailyGoals } from 'pages/api/dailyGoals';

export const getDailyGoals = async (userId: string, date: string) => {
    const user = await prismaClient.user.count({ where: { id: userId } });
    if (!user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono użytkownika');
    }

    const dailyGoals = await prismaClient.dailyGoals.findFirst({
        where: { userId, dateTime: { lte: new Date(date) } },
        orderBy: {
            dateTime: 'desc',
        },
    });

    if (!dailyGoals) {
        const dailyGoals = await prismaClient.dailyGoals.findFirst({
            where: { userId },
            orderBy: {
                dateTime: 'asc',
            },
        });

        return dailyGoals;
    }

    return dailyGoals;
};

export const changeDailyGoals = async (userId: string, body: BodyDailyGoals) => {
    const user = await prismaClient.user.count({ where: { id: userId } });
    if (!user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono użytkownika');
    }
    const dataValid = await createDailyGoalsValidationSchema.validate(body).catch(() => {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie prawidłowe dane!');
    });

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
