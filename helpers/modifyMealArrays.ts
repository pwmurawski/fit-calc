import { FoodProductKeyType } from "../types/IFoodProductDataTypes";
import { IMealResponse } from "../types/IMealResponse";
import { IMealsData } from "../types/MealsDataTypes";
import { ISelectedProductResponse } from "../types/SelectedProductTypes";

const modifyData = (
  mealId: string,
  selectedProducts: ISelectedProductResponse[]
) => {
  return selectedProducts
    .filter(({ meal }) => meal.id === mealId)
    .map(({ foodProduct, weight, meal, id, userId, dateTime }) => ({
      ...foodProduct,
      id,
      userId,
      weight,
      mealId: meal.id,
      dateTime,
    }));
};

const sumInMeal = (
  mealId: string,
  selectedProducts: ISelectedProductResponse[],
  key: FoodProductKeyType
) => {
  return modifyData(mealId, selectedProducts).reduce(
    (sum, curr) => sum + (curr[key] * curr.weight) / 100,
    0
  );
};

const modifyMealArrays = (
  mealsType: IMealResponse[],
  selectedProducts: ISelectedProductResponse[]
): IMealsData[] => {
  return mealsType.map(({ id, name }) => ({
    id,
    name,
    kcal: sumInMeal(id, selectedProducts, "kcal"),
    protein: sumInMeal(id, selectedProducts, "protein"),
    fat: sumInMeal(id, selectedProducts, "fat"),
    carbs: sumInMeal(id, selectedProducts, "carbs"),
    selectedProduct: modifyData(id, selectedProducts),
  }));
};

export default modifyMealArrays;
