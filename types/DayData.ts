import { MealsData } from './Meal';
import { SummaryCalorieMacroData } from './SummaryCalorieMacroData';

export type DayDataResponse = {
    mealsData: MealsData[];
    summaryData: SummaryCalorieMacroData;
};
