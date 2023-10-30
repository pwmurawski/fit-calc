import { HttpStatusCode } from 'axios';
import prismaClient from 'lib/app/prisma-client';
import { ApiError } from 'next/dist/server/api-utils';

export const getSelectedProductsDay = async (userId: string, date: string) => {
    const user = await prismaClient.user.count({ where: { id: userId } });
    if (!user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono użytkownika');
    }

    const selectedProducts = await prismaClient.selectedProduct.findMany({
        where: { dateTime: new Date(date), userId },
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
