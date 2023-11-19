import prismaClient from 'lib/app/prisma-client';
import { createFoodProductValidationSchema } from 'lib/validation/foodProductValidationSchema';
import { checkUserExist } from './user';
import { validation } from '../validation';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from 'axios';
import { BodyFoodProducts } from 'types/FoodProduct';

export const getFoodProducts = async () => {
    const foodProducts = await prismaClient.foodProduct.findMany();
    return foodProducts;
};

export const getFoodProduct = async (id: string) => {
    const foodProduct = await prismaClient.foodProduct.findUnique({ where: { id } });
    return foodProduct;
};

export const createFoodProduct = async (userId: string, body: BodyFoodProducts) => {
    await checkUserExist(userId);
    const data = await validation(createFoodProductValidationSchema.validate(body));

    const foodProduct = await prismaClient.foodProduct.create({ data: { ...data, userId } });
    return foodProduct;
};

export const updateFoodProduct = async (id: string, userId: string, body: BodyFoodProducts) => {
    await checkUserExist(userId);
    const data = await validation(createFoodProductValidationSchema.validate(body));

    const foodProduct = await prismaClient.foodProduct.findFirst({ where: { id, userId }, select: { id: true } });
    if (!foodProduct) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
    }

    const newfoodProductData = await prismaClient.foodProduct.update({ where: { id: foodProduct.id }, data });
    return newfoodProductData;
};

export const searchFoodProducts = async (term?: string) => {
    const foodProducts = await prismaClient.foodProduct.findMany({
        where: { OR: [{ name: { contains: term, mode: 'insensitive' } }, { code: { contains: term } }] },
    });
    return foodProducts;
};
