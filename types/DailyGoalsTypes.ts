export interface DailyGoalsType {
    id: string;
    userId: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
    date: string;
}

export type BodyDailyGoalsType = Record<keyof Omit<DailyGoalsType, 'id' | 'userId' | 'date'>, string>;
