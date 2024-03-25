import prismaClient from 'lib/app/prisma-client';

export const getBlockedFoodProducts = async () => {
    return await prismaClient.blockedFoodProduct.findMany();
};

export const createBlockedFoodProducts = async (foodProductId: string) => {
    return await prismaClient.blockedFoodProduct.create({ data: { foodProductId } });
};

export const deleteBlockedFoodProducts = async (foodProductId: string) => {
    return await prismaClient.blockedFoodProduct.delete({ where: { foodProductId } });
};
