import prismaClient from 'lib/app/prisma-client';
import { createFoodProductValidationSchema } from 'lib/validation/foodProductValidationSchema';
import { checkUserExist } from './user';
import { validation } from '../validation';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from 'axios';
import { BodyFoodProducts } from 'types/FoodProduct';
import { first, omit } from 'lodash';

export const getFoodProducts = async () => {
    const foodProducts = await prismaClient.foodProduct.findMany({
        include: { selectedProducts: { select: { weight: true }, orderBy: { dateTime: 'desc' }, take: 1 } },
    });

    return foodProducts.map((foodProduct) => ({
        ...omit(foodProduct, 'selectedProducts'),
        lastSelectedProduct: { weight: first(foodProduct.selectedProducts)?.weight },
    }));
};

export const getFoodProduct = async (id: string) => {
    const foodProduct = await prismaClient.foodProduct.findUnique({
        where: { id },
        include: {
            selectedProducts: {
                select: { id: true, weight: true },
                orderBy: { dateTime: 'desc' },
                take: 4,
            },
        },
    });

    return {
        ...omit(foodProduct, 'selectedProducts'),
        lastSelectedProducts:
            foodProduct?.selectedProducts.map(({ id, weight }) => ({
                id,
                weight,
                kcal: Number(((foodProduct.kcal * weight) / 100).toFixed(1)),
            })) ?? [],
    };
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
        include: { selectedProducts: { select: { weight: true }, orderBy: { dateTime: 'desc' }, take: 1 } },
    });

    return foodProducts.map((foodProduct) => ({
        ...omit(foodProduct, 'selectedProducts'),
        lastSelectedProduct: { weight: first(foodProduct.selectedProducts)?.weight },
    }));
};
