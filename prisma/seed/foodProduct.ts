import { FoodProduct } from '@prisma/client';

export const foodProductSeed: FoodProduct[] = [
    {
        id: '22200000-1000-474c-b092-b0dd880c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        name: 'Mleko 2.0%',
        kcal: 49,
        protein: 3,
        fat: 2,
        carbs: 4.7,
        code: '5900512850023',
    },
    {
        id: '22200000-2000-474c-b092-b0dd880c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        name: 'Pizza z kurczakiem',
        kcal: 233,
        protein: 14.6,
        fat: 6.9,
        carbs: 26.7,
        code: '8410762861023',
    },
    {
        id: '22200000-3000-474c-b092-b0dd880c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        name: 'Chleb',
        kcal: 255,
        protein: 6.5,
        fat: 1.3,
        carbs: 56.3,
        code: null,
    },
];
