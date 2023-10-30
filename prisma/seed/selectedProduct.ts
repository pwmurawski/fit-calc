import { SelectedProduct } from '@prisma/client';

export const selectedProductSeed: SelectedProduct[] = [
    {
        id: '2220001-1000-474c-b092-b0dd880c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        mealId: 'cld20gjwh00001u2cojyld4ko',
        foodProductId: '22200000-1000-474c-b092-b0dd880c07e1',
        weight: 100,
        dateTime: new Date(),
    },
    {
        id: '22200002-2000-474c-b092-b0dd880c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        mealId: 'clbuknbfv0003d68odecy9ue0',
        foodProductId: '22200000-2000-474c-b092-b0dd880c07e1',
        weight: 200,
        dateTime: new Date(),
    },
    {
        id: '22200003-3000-474c-b092-b0dd880c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        mealId: 'clbuknbfv0003d68odecy9ue0',
        foodProductId: '22200000-3000-474c-b092-b0dd880c07e1',
        weight: 300,
        dateTime: new Date(),
    },
];
