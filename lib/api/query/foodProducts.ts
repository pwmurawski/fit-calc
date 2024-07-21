import prismaClient from 'lib/app/prisma-client';
import { createFoodProductValidationSchema } from 'lib/validation/foodProductValidationSchema';
import { checkUserExist, getUserId } from './user';
import { validation } from '../validation';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from 'axios';
import { Action, BodyFoodProducts, ImportFoodProductAdmin } from 'types/FoodProduct';
import { omit } from 'lodash';
import { FOOD_PRODUCTS_PAGE_SIZE } from '../constants';
import { verifiedFoodProductExist } from './verifiedFoodProducts';
import { objectToCsv } from 'helpers/objectToCsv';
import { importValidationSchema } from 'lib/validation/importValidationSchema';
import { createBlockedFoodProducts } from './blockedFoodProducts';

export const checkFoodProductExist = async (id: string, userId?: string) => {
    if (userId) {
        const foodProduct = await prismaClient.foodProduct.findFirst({
            where: { id, userId },
            include: { verifiedFoodProduct: true },
        });
        if (!foodProduct) {
            throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
        }
        return foodProduct;
    } else {
        const foodProduct = await prismaClient.foodProduct.findUnique({
            where: { id },
            include: { verifiedFoodProduct: true },
        });
        if (!foodProduct) {
            throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
        }
        return foodProduct;
    }
};

export const checkManyFoodProductExist = async (ids: string[]) => {
    const defaultValue = ids.reduce<{ [x: string]: boolean }>((acc, key) => {
        acc[key] = false;
        return acc;
    }, {});
    const value = (
        await prismaClient.foodProduct.findMany({ where: { id: { in: ids } }, select: { id: true } })
    ).reduce<{ [x: string]: boolean }>((acc, { id }) => {
        acc[id] = true;
        return acc;
    }, {});

    return { ...defaultValue, ...value };
};

export const getAllFoodProducts = async () => {
    const foodProducts = await prismaClient.foodProduct.findMany({
        include: { verifiedFoodProduct: true, blockedFoodProduct: true, user: { select: { email: true } } },
    });

    return foodProducts.map((foodProduct) => ({
        ...foodProduct,
        verifiedFoodProduct: Boolean(foodProduct.verifiedFoodProduct),
        blockedFoodProduct: Boolean(foodProduct.blockedFoodProduct),
    }));
};

export const getAllFoodProductsNotBlocked = async (page?: number, pageSize?: number) => {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const foodProducts = await prismaClient.foodProduct.findMany({
        where: { blockedFoodProduct: null },
        include: { verifiedFoodProduct: true, blockedFoodProduct: true, user: { select: { email: true } } },
        take: pageSize,
        skip,
    });
    const total = await prismaClient.foodProduct.count({
        where: { blockedFoodProduct: null },
    });

    return {
        foodProducts: foodProducts.map((foodProduct) => ({
            ...foodProduct,
            user: foodProduct.user?.email,
            verifiedFoodProduct: Boolean(foodProduct.verifiedFoodProduct),
            blockedFoodProduct: Boolean(foodProduct.blockedFoodProduct),
        })),
        total,
        page,
        pageSize,
    };
};

export const getAllFoodProductsBlocked = async (page?: number, pageSize?: number) => {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const foodProducts = await prismaClient.blockedFoodProduct.findMany({
        select: {
            foodProduct: {
                include: { verifiedFoodProduct: true, blockedFoodProduct: true, user: { select: { email: true } } },
            },
        },
        take: pageSize,
        skip,
    });
    const total = await prismaClient.blockedFoodProduct.count();

    return {
        foodProducts: foodProducts.map(({ foodProduct }) => ({
            ...foodProduct,
            user: foodProduct.user?.email,
            verifiedFoodProduct: Boolean(foodProduct.verifiedFoodProduct),
            blockedFoodProduct: Boolean(foodProduct.blockedFoodProduct),
        })),
        total,
        page,
        pageSize,
    };
};

export const getFoodProducts = async (userId: string, page: number) => {
    const foodProducts: any = await prismaClient.$queryRaw`
        SELECT fp.*, 
            (SELECT weight
                FROM "SelectedProduct"
                WHERE "foodProductId" = fp.id AND "userId" = ${userId}
                ORDER BY "dateTime" DESC
                LIMIT 1) AS "lastSelectedProductWeight",
            CASE
                WHEN vf.id IS NOT NULL THEN TRUE
                ELSE FALSE
            END AS "verifiedFoodProduct"
        FROM "FoodProduct" fp
        LEFT JOIN "UserFoodProductCount" uc ON uc."foodProductId" = fp.id AND uc."userId" = ${userId}
        LEFT JOIN "VerifiedFoodProduct" vf ON vf."foodProductId" = fp.id
        LEFT JOIN "BlockedFoodProduct" bfp ON bfp."foodProductId" = fp.id
        WHERE bfp.id IS NULL AND (vf.id IS NOT NULL OR fp."userId" = ${userId})
        ORDER BY COALESCE(uc."count", 0) DESC
        LIMIT ${FOOD_PRODUCTS_PAGE_SIZE} OFFSET ${(page - 1) * FOOD_PRODUCTS_PAGE_SIZE};
    `;

    return foodProducts;
};

export const getFoodProduct = async (id: string, userId: string) => {
    const foodProduct = await prismaClient.foodProduct.findUnique({
        where: { id },
        include: { verifiedFoodProduct: true },
    });
    if (!foodProduct) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono produktu');
    }

    const selectedProducts = await prismaClient.selectedProduct.findMany({
        where: { userId, foodProductId: foodProduct.id },
        select: { id: true, weight: true },
        orderBy: { dateTime: 'desc' },
        distinct: ['weight'],
        take: 4,
    });

    return {
        ...omit(foodProduct, 'selectedProducts'),
        verifiedFoodProduct: !!foodProduct.verifiedFoodProduct,
        lastSelectedProducts:
            selectedProducts.map(({ id, weight }) => ({
                id,
                weight,
                kcal: Number(((foodProduct.kcal * weight) / 100).toFixed(1)),
            })) ?? [],
    };
};

export const searchFoodProducts = async (userId: string, term?: string) => {
    const foodProducts = await prismaClient.foodProduct.findMany({
        where: {
            AND: [
                { OR: [{ name: { contains: term, mode: 'insensitive' } }, { code: { contains: term } }] },
                { OR: [{ verifiedFoodProduct: { isNot: null } }, { userId }] },
            ],
            blockedFoodProduct: { is: null },
        },
        include: { verifiedFoodProduct: true },
        take: 100,
    });

    const foodProductIds = foodProducts.map(({ id }) => id);
    const selectedProducts = await prismaClient.selectedProduct.findMany({
        where: { foodProductId: { in: foodProductIds }, userId },
        select: { weight: true, foodProductId: true },
        orderBy: { dateTime: 'desc' },
    });

    return foodProducts.map((foodProduct) => ({
        ...omit(foodProduct, 'selectedProducts'),
        verifiedFoodProduct: !!foodProduct.verifiedFoodProduct,
        lastSelectedProductWeight:
            selectedProducts.find(({ foodProductId }) => foodProductId === foodProduct.id)?.weight ?? null,
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
    const foodProduct = await checkFoodProductExist(id, userId);
    const data = await validation(createFoodProductValidationSchema.validate(body));

    if (foodProduct.verifiedFoodProduct) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie można edytować, ponieważ produkt został zweryfikowany!');
    }

    const newfoodProductData = await prismaClient.foodProduct.update({ where: { id }, data });
    return newfoodProductData;
};

export const deleteFoodProduct = async (id: string, userId: string) => {
    await checkUserExist(userId);
    const foodProduct = await checkFoodProductExist(id, userId);

    if (foodProduct.verifiedFoodProduct) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie można usunąć, ponieważ produkt został zweryfikowany!');
    }

    await createBlockedFoodProducts(id);
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

export const exportFoodProductAdmin = async () => {
    const foodProducts = await getAllFoodProducts();

    const data = foodProducts.map((foodProduct) => ({
        ...omit(foodProduct, ['userId']),
        user: foodProduct.user?.email,
    }));

    const headersMap = [
        { title: 'id', name: 'id' },
        { title: 'user', name: 'user' },
        { title: 'name', name: 'name' },
        { title: 'kcal', name: 'kcal' },
        { title: 'protein', name: 'protein' },
        { title: 'fat', name: 'fat' },
        { title: 'carbs', name: 'carbs' },
        { title: 'code', name: 'code' },
        { title: 'verifiedFoodProduct', name: 'verified' },
        { title: 'blockedFoodProduct', name: 'blocked' },
    ];

    return objectToCsv(data, headersMap);
};

export const importFoodProductAdmin = async (data: ImportFoodProductAdmin, userIdAdmin: string) => {
    const foodProducts = await importValidationSchema.validate(data).catch((error) => {
        const index = Number(error.path.split('.')[0].replace(/[^\w\s]/gi, '')) + 1;
        const columnName = error.path.split('.')[1];

        throw new ApiError(
            HttpStatusCode.Forbidden,
            `Bład w lini ${index} - Wartość w kolumnie ${columnName} ${error.errors[0]}`,
        );
    });

    if (foodProducts) {
        for (const foodProduct of foodProducts) {
            const userId = await getUserId(foodProduct.user);
            const newfoodProductData = omit(foodProduct, [
                'id',
                'user',
                'verifiedFoodProduct',
                'blockedFoodProduct',
                'action',
            ]);

            if (foodProduct.action === Action.Create) {
                await prismaClient.foodProduct.create({
                    data: {
                        ...newfoodProductData,
                        userId: userId ?? userIdAdmin,
                        verifiedFoodProduct: foodProduct.verifiedFoodProduct ? { create: {} } : undefined,
                        blockedFoodProduct: foodProduct.blockedFoodProduct ? { create: {} } : undefined,
                    },
                });
            }

            if (foodProduct.action === Action.Edit) {
                const foodProductOld = await prismaClient.foodProduct.findUnique({
                    where: { id: foodProduct.id },
                    select: {
                        verifiedFoodProduct: true,
                        blockedFoodProduct: true,
                    },
                });
                const verifiedFoodProduct = Boolean(foodProductOld?.verifiedFoodProduct);
                const blockedFoodProduct = Boolean(foodProductOld?.blockedFoodProduct);

                await prismaClient.foodProduct.update({
                    where: { id: foodProduct.id },
                    data: {
                        ...newfoodProductData,
                        userId: userId,
                        verifiedFoodProduct:
                            verifiedFoodProduct !== foodProduct.verifiedFoodProduct
                                ? foodProduct.verifiedFoodProduct
                                    ? { create: {} }
                                    : { delete: true }
                                : undefined,
                        blockedFoodProduct:
                            blockedFoodProduct !== foodProduct.blockedFoodProduct
                                ? foodProduct.blockedFoodProduct
                                    ? { create: {} }
                                    : { delete: true }
                                : undefined,
                    },
                });
            }
        }
    }
};
