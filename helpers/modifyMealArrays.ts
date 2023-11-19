import { Meal } from '@prisma/client';
import { FoodProductKeyType } from '../types/FoodProduct';
import { MealsData } from '../types/Meal';
import { SelectedProductWithFoodProductAndMeal } from '../types/SelectedProduct';
import { format } from 'date-fns';

const modifyData = (mealId: string, selectedProducts: SelectedProductWithFoodProductAndMeal[]) => {
    return selectedProducts
        .filter(({ meal }) => meal.id === mealId)
        .map(({ foodProduct, weight, meal, id, userId, dateTime }) => ({
            ...foodProduct,
            id,
            userId,
            weight,
            mealId: meal.id,
            dateTime: format(dateTime, 'yyyy-MM-dd'),
        }));
};

const sumInMeal = (
    mealId: string,
    selectedProducts: SelectedProductWithFoodProductAndMeal[],
    key: FoodProductKeyType,
) => {
    return modifyData(mealId, selectedProducts).reduce((sum, curr) => sum + (curr[key] * curr.weight) / 100, 0);
};

const modifyMealArrays = (
    mealsType: Meal[],
    selectedProducts: SelectedProductWithFoodProductAndMeal[],
): MealsData[] => {
    return mealsType.map(({ id, name }) => ({
        id,
        name,
        kcal: sumInMeal(id, selectedProducts, 'kcal'),
        protein: sumInMeal(id, selectedProducts, 'protein'),
        fat: sumInMeal(id, selectedProducts, 'fat'),
        carbs: sumInMeal(id, selectedProducts, 'carbs'),
        selectedProduct: modifyData(id, selectedProducts),
    }));
};

export default modifyMealArrays;
