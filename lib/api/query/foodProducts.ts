import prismaClient from 'lib/app/prisma-client';
import { createFoodProductValidationSchema } from 'lib/validation/foodProductValidationSchema';
import { checkUserExist } from './user';
import { validation } from '../validation';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from 'axios';
import { BodyFoodProducts } from 'types/FoodProduct';
import { first, omit } from 'lodash';
import { FOOD_PRODUCTS_PAGE_SIZE } from '../constants';
import { verifiedFoodProductExist } from './verifiedFoodProducts';

export const checkFoodProductExist = async (id: string, userId?: string) => {
    if (userId) {
        const foodProduct = await prismaClient.foodProduct.count({ where: { id, userId } });
        if (!foodProduct) {
            throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
        }
    } else {
        const foodProduct = await prismaClient.foodProduct.count({ where: { id } });
        if (!foodProduct) {
            throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
        }
    }
};

export const getAllFoodProducts = async () => {
    const foodProducts = await prismaClient.foodProduct.findMany({
        where: { blockedFoodProduct: null },
        include: { verifiedFoodProduct: true, blockedFoodProduct: true },
    });

    return foodProducts.map((foodProduct) => ({
        ...foodProduct,
        verifiedFoodProduct: Boolean(foodProduct.verifiedFoodProduct),
        blockedFoodProduct: Boolean(foodProduct.blockedFoodProduct),
    }));
};

export const getAllFoodProductsBlocked = async () => {
    const foodProducts = await prismaClient.blockedFoodProduct.findMany({
        select: { foodProduct: { include: { verifiedFoodProduct: true, blockedFoodProduct: true } } },
    });

    return foodProducts.map(({ foodProduct }) => ({
        ...foodProduct,
        verifiedFoodProduct: Boolean(foodProduct.verifiedFoodProduct),
        blockedFoodProduct: Boolean(foodProduct.blockedFoodProduct),
    }));
};

export const getFoodProducts = async (userId: string, page: number) => {
    const foodProducts: any = await prismaClient.$queryRaw`
        SELECT fp.*, 
            (SELECT weight
                FROM "SelectedProduct"
                WHERE "foodProductId" = fp.id AND "userId" = ${userId}
                ORDER BY "dateTime" DESC
                LIMIT 1) AS "lastSelectedProductWeight"
        FROM "FoodProduct" fp
        LEFT JOIN "UserFoodProductCount" uc ON uc."foodProductId" = fp.id AND uc."userId" = ${userId}
        ORDER BY COALESCE(uc."count", 0) DESC
        LIMIT ${FOOD_PRODUCTS_PAGE_SIZE} OFFSET ${(page - 1) * FOOD_PRODUCTS_PAGE_SIZE};
    `;

    return foodProducts.map((foodProduct: any) => ({
        ...foodProduct,
        lastSelectedProduct: {
            weight: foodProduct.lastSelectedProductWeight,
        },
    }));
};

export const getFoodProduct = async (id: string) => {
    const foodProduct = await prismaClient.foodProduct.findUnique({
        where: { id },
        include: {
            selectedProducts: {
                select: { id: true, weight: true },
                orderBy: { dateTime: 'desc' },
                distinct: ['weight'],
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

export const searchFoodProducts = async (term?: string) => {
    const foodProducts = await prismaClient.foodProduct.findMany({
        where: { OR: [{ name: { contains: term, mode: 'insensitive' } }, { code: { contains: term } }] },
        include: { selectedProducts: { select: { weight: true }, orderBy: { dateTime: 'desc' }, take: 1 } },
        take: 100,
    });

    return foodProducts.map((foodProduct) => ({
        ...omit(foodProduct, 'selectedProducts'),
        lastSelectedProduct: { weight: first(foodProduct.selectedProducts)?.weight },
    }));
};

export const createFoodProduct = async (userId: string, body: BodyFoodProducts) => {
    await checkUserExist(userId);
    const data = await validation(createFoodProductValidationSchema.validate(body));

    const foodProduct = await prismaClient.foodProduct.create({ data: { ...data, userId } });
    return foodProduct;
};

export const updateFoodProduct = async (id: string, userId: string, body: BodyFoodProducts) => {
    await checkUserExist(userId);
    await checkFoodProductExist(id, userId);
    const data = await validation(createFoodProductValidationSchema.validate(body));

    const newfoodProductData = await prismaClient.foodProduct.update({ where: { id }, data });
    return newfoodProductData;
};

export const deleteFoodProduct = async (id: string, userId: string) => {
    await checkUserExist(userId);
    await checkFoodProductExist(id, userId);
    await prismaClient.foodProduct.delete({ where: { id } });
};

export const updateFoodProductAdmin = async (id: string, body: BodyFoodProducts) => {
    await checkFoodProductExist(id);
    const data = await validation(createFoodProductValidationSchema.validate(body));

    const newfoodProductData = await prismaClient.foodProduct.update({ where: { id }, data });
    return newfoodProductData;
};

export const deleteFoodProductAdmin = async (id: string) => {
    await checkFoodProductExist(id);
    if (await verifiedFoodProductExist(id)) {
        await prismaClient.verifiedFoodProduct.delete({ where: { foodProductId: id } });
    }
    await prismaClient.blockedFoodProduct.delete({ where: { foodProductId: id } });
    await prismaClient.foodProduct.delete({ where: { id } });
};
