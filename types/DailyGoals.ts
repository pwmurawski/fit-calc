import { DailyGoals } from '@prisma/client';

export type BodyDailyGoals = Record<keyof Omit<DailyGoals, 'id' | 'userId' | 'dateTime'>, string>;

export type DailyGoalsResponse = {
    dailyGoals: Pick<DailyGoals, 'kcal' | 'protein' | 'fat' | 'carbs'> | null;
};
