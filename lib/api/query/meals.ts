import prismaClient from 'lib/app/prisma-client';

export const getMeals = async () => {
    const meals = await prismaClient.meal.findMany();
    return meals;
};
