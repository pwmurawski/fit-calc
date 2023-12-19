import { DailyGoals } from '@prisma/client';

export interface SummaryCalorieMacroData {
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface SummaryResponse {
    summaryData: SummaryCalorieMacroData;
    dailyGoals: Pick<DailyGoals, 'kcal' | 'protein' | 'fat' | 'carbs'> | null;
}
