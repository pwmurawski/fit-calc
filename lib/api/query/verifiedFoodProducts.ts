import { HttpStatusCode } from 'axios';
import prismaClient from 'lib/app/prisma-client';
import { ApiError } from 'next/dist/server/api-utils';

export const verifiedFoodProductExist = async (foodProductId: string) => {
    const verifiedFoodProduct = await prismaClient.verifiedFoodProduct.count({ where: { foodProductId } });
    return Boolean(verifiedFoodProduct);
};

export const checkVerifiedFoodProductExist = async (foodProductId: string) => {
    if (!(await verifiedFoodProductExist(foodProductId))) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Produkt nie jest zweryfikowany');
    }
};

export const checkVerifiedFoodProductNotExist = async (foodProductId: string) => {
    if (await verifiedFoodProductExist(foodProductId)) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Produkt jest juz zweryfikowany');
    }
};

export const getVerifiedFoodProducts = async () => {
    return await prismaClient.verifiedFoodProduct.findMany();
};

export const createVerifiedFoodProducts = async (foodProductId: string) => {
    await checkVerifiedFoodProductNotExist(foodProductId);
    return await prismaClient.verifiedFoodProduct.create({ data: { foodProductId } });
};

export const deleteVerifiedFoodProducts = async (foodProductId: string) => {
    await checkVerifiedFoodProductExist(foodProductId);
    return await prismaClient.verifiedFoodProduct.delete({ where: { foodProductId } });
};
