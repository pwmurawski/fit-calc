import prismaClient from 'lib/app/prisma-client';

export const getFoodProducts = async () => {
    const foodProducts = await prismaClient.foodProduct.findMany();
    return foodProducts;
};

export const getFoodProduct = async (id: string) => {
    const foodProduct = await prismaClient.foodProduct.findUnique({ where: { id } });
    return foodProduct;
};

export const searchFoodProducts = async (term?: string) => {
    const foodProducts = await prismaClient.foodProduct.findMany({
        where: { OR: [{ name: { contains: term, mode: 'insensitive' } }, { code: { contains: term } }] },
    });
    return foodProducts;
};
