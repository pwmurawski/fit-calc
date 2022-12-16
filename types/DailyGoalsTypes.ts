export interface IDailyGoals {
  id: string;
  userId: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  date: string;
}

export type IBodyDailyGoals = Record<
  keyof Omit<IDailyGoals, "id" | "userId" | "date">,
  string
>;
