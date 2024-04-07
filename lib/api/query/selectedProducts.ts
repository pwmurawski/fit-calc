import prismaClient from 'lib/app/prisma-client';
import {
    createSelectedProductsValidationSchema,
    updateSelectedProductsValidationSchema,
} from 'lib/validation/selectedProductsValidationSchema';
import { checkUserExist } from './user';
import { validation } from '../validation';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from 'axios';
import { BodySelectedProduct } from 'types/SelectedProduct';
import { createUserFoodProductCount, deleteUserFoodProductCount } from './userFoodProductCount';

export const checkSelectedProductExist = async (id: string, userId: string) => {
    const selectedProduct = await prismaClient.selectedProduct.findFirst({
        where: { id, userId },
    });
    if (!selectedProduct) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
    }
    return selectedProduct;
};

export const getSelectedProducts = async (userId: string, date: string) => {
    await checkUserExist(userId);

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const selectedProducts = await prismaClient.selectedProduct.findMany({
        where: { dateTime: { gte: startDate, lte: endDate }, userId },
        include: {
            meal: true,
        },
    });

    return selectedProducts;
};

export const getSelectedProductsByDateRange = async (userId: string, startDate: string, endDate: string) => {
    await checkUserExist(userId);

    const selectedProducts = await prismaClient.selectedProduct.findMany({
        where: { dateTime: { gte: new Date(startDate), lte: new Date(endDate) }, userId },
        include: {
            meal: true,
        },
    });

    return selectedProducts;
};

export const getSelectedProduct = async (id: string, userId: string) => {
    await checkUserExist(userId);

    const selectedProduct = await prismaClient.selectedProduct.findFirst({
        where: { id, userId },
    });

    return selectedProduct;
};

export const createSelectedProducts = async (userId: string, body: BodySelectedProduct) => {
    const data = await validation(createSelectedProductsValidationSchema.validate(body));
    await checkUserExist(userId);

    const foodProduct = await prismaClient.foodProduct.findUnique({ where: { id: data.foodProductId } });
    if (!foodProduct) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
    }

    const newSelectedProduct = await prismaClient.selectedProduct.create({
        data: {
            userId,
            mealId: data.mealId,
            foodProductId: foodProduct.id,
            weight: data.weight,
            dateTime: data.dateTime,
            name: foodProduct.name,
            kcal: foodProduct.kcal,
            protein: foodProduct.protein,
            fat: foodProduct.fat,
            carbs: foodProduct.carbs,
            code: foodProduct.code,
        },
    });
    await createUserFoodProductCount(userId, foodProduct.id);

    return newSelectedProduct;
};

export const updateSelectedProduct = async (id: string, userId: string, body: Pick<BodySelectedProduct, 'weight'>) => {
    await checkUserExist(userId);
    await checkSelectedProductExist(id, userId);
    const data = await validation(updateSelectedProductsValidationSchema.validate(body));

    const newSelectedProduct = await prismaClient.selectedProduct.update({ where: { id }, data });
    return newSelectedProduct;
};

export const deleteSelectedProduct = async (id: string, userId: string) => {
    await checkUserExist(userId);
    const selectedProduct = await checkSelectedProductExist(id, userId);

    await prismaClient.selectedProduct.delete({ where: { id } });
    await deleteUserFoodProductCount(userId, selectedProduct.foodProductId);
};
