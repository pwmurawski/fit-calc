import { DailyGoals } from '@prisma/client';
import { MealsData } from './Meal';

export interface SummaryCalorieMacroData {
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface SummaryResponse {
    summaryData: SummaryCalorieMacroData;
    dailyGoals: Pick<DailyGoals, 'kcal' | 'protein' | 'fat' | 'carbs'> | null;
    daysData: {
        mealsData: MealsData[];
        summaryData: SummaryCalorieMacroData;
        date: string;
    }[];
}
