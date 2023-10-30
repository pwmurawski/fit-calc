import { DailyGoals } from '@prisma/client';

export const dailyGoalsSeed: DailyGoals[] = [
    {
        id: '22210000-1000-474c-b092-b0dd880c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        kcal: 2600,
        protein: 163,
        fat: 72,
        carbs: 325,
        dateTime: new Date(),
    },
    {
        id: '22210000-1000-474c-b092-b0dd990c07e1',
        userId: 'clbuknbfv0000d68odecy9ue0',
        kcal: 3600,
        protein: 263,
        fat: 92,
        carbs: 425,
        dateTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    },
];
