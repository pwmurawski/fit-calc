import prismaClient from 'lib/app/prisma-client';
import { checkUserExist } from './user';

export const checkUserFoodProductCountExist = async (userId: string, foodProductId: string) => {
    return await prismaClient.userFoodProductCount.findFirst({
        where: { userId, foodProductId },
    });
};

export const createUserFoodProductCount = async (userId: string, foodProductId: string) => {
    await checkUserExist(userId);
    const userFoodProductCount = await checkUserFoodProductCountExist(userId, foodProductId);

    if (userFoodProductCount) {
        return await prismaClient.userFoodProductCount.update({
            where: { id: userFoodProductCount.id },
            data: { count: userFoodProductCount.count + 1 },
        });
    }
    return await prismaClient.userFoodProductCount.create({
        data: { foodProductId, userId, count: 1 },
    });
};

export const deleteUserFoodProductCount = async (userId: string, foodProductId: string) => {
    await checkUserExist(userId);
    const userFoodProductCount = await checkUserFoodProductCountExist(userId, foodProductId);

    if (userFoodProductCount) {
        return await prismaClient.userFoodProductCount.update({
            where: { id: userFoodProductCount.id },
            data: { count: userFoodProductCount.count - 1 },
        });
    }
    return;
};
