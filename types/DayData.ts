import { MealsData } from './Meal';
import { SummaryCalorieMacroData } from './Summary';

export type DayDataResponse = {
    mealsData: MealsData[];
    summaryData: SummaryCalorieMacroData;
};
