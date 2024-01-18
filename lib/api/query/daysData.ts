import modifyMealArrays from 'helpers/modifyMealArrays';
import { getMeals } from './meals';
import { getSelectedProducts } from './selectedProducts';
import modifySummaryCalorieMacroData from 'helpers/modifySummaryCalorieMacroData';

export const getDayData = async (userId: string, date: string) => {
    const meals = await getMeals();
    const selectedProductDay = await getSelectedProducts(userId, date);

    const mealsData = modifyMealArrays(meals, selectedProductDay);
    const summaryData = modifySummaryCalorieMacroData(selectedProductDay);

    return {
        mealsData,
        summaryData,
    };
};
