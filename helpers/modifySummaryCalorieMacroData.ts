import { FoodProductKeyType } from '../types/FoodProduct';
import { SelectedProductWithFoodProductAndMeal } from '../types/SelectedProduct';
import { SummaryCalorieMacroData } from '../types/SummaryCalorieMacroData';

const sumMacro = (selectedProducts: SelectedProductWithFoodProductAndMeal[], key: FoodProductKeyType) => {
    return selectedProducts.reduce((sum, curr) => sum + (curr.foodProduct[key] * curr.weight) / 100, 0);
};

const modifySummaryCalorieMacroData = (
    selectedProducts: SelectedProductWithFoodProductAndMeal[],
): SummaryCalorieMacroData => {
    return {
        kcal: sumMacro(selectedProducts, 'kcal'),
        protein: sumMacro(selectedProducts, 'protein'),
        fat: sumMacro(selectedProducts, 'fat'),
        carbs: sumMacro(selectedProducts, 'carbs'),
    };
};

export default modifySummaryCalorieMacroData;
