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

export const checkSelectedProductExist = async (id: string, userId: string) => {
    const selectedProduct = await prismaClient.selectedProduct.count({
        where: { id, userId },
    });
    if (!selectedProduct) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
    }
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
            foodProduct: {
                select: {
                    code: true,
                    name: true,
                    kcal: true,
                    protein: true,
                    fat: true,
                    carbs: true,
                },
            },
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
            foodProduct: {
                select: {
                    code: true,
                    name: true,
                    kcal: true,
                    protein: true,
                    fat: true,
                    carbs: true,
                },
            },
            meal: true,
        },
    });

    return selectedProducts;
};

export const getSelectedProduct = async (id: string, userId: string) => {
    await checkUserExist(userId);

    const selectedProduct = await prismaClient.selectedProduct.findFirst({
        where: { id, userId },
        include: {
            foodProduct: {
                select: {
                    code: true,
                    name: true,
                    kcal: true,
                    protein: true,
                    fat: true,
                    carbs: true,
                },
            },
        },
    });

    return selectedProduct;
};

export const createSelectedProducts = async (userId: string, body: BodySelectedProduct) => {
    await checkUserExist(userId);
    const data = await validation(createSelectedProductsValidationSchema.validate(body));

    const newSelectedProduct = await prismaClient.selectedProduct.create({
        data: { ...data, userId, dateTime: data.dateTime },
    });
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
    await checkSelectedProductExist(id, userId);

    await prismaClient.selectedProduct.delete({ where: { id } });
};
