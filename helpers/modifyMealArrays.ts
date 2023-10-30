import { FoodProductKeyType } from '../types/FoodProductTypes';
import { MealType, MealsData } from '../types/MealTypes';
import { SelectedProductType } from '../types/SelectedProductTypes';
import { format } from 'date-fns';

const modifyData = (mealId: string, selectedProducts: SelectedProductType[]) => {
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

const sumInMeal = (mealId: string, selectedProducts: SelectedProductType[], key: FoodProductKeyType) => {
    return modifyData(mealId, selectedProducts).reduce((sum, curr) => sum + (curr[key] * curr.weight) / 100, 0);
};

const modifyMealArrays = (mealsType: MealType[], selectedProducts: SelectedProductType[]): MealsData[] => {
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
