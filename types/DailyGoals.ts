import { DailyGoals } from '@prisma/client';

export type BodyDailyGoals = Record<keyof Omit<DailyGoals, 'id' | 'userId' | 'dateTime'>, string>;

export type DailyGoalsResponse = {
    dailyGoals: DailyGoals | null;
};
