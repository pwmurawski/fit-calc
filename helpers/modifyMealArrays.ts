import { FoodProductKeyType } from "../interfaces/IFoodProductData";

import { IMealResponse } from "../interfaces/IMealResponse";
import { IMealsData } from "../interfaces/IMealsData";
import { ISelectedProductResponse } from "../interfaces/ISelectedProductResponse";

const filterMap = (mealId: string, arr: ISelectedProductResponse[]) => {
  return arr
    .filter(({ meal }) => meal.id === mealId)
    .map(({ foodProduct, weight, meal, id, dateTime }) => ({
      ...foodProduct,
      weight,
      mealId: meal.id,
      selectedId: id,
      dateTime,
    }));
};

const filterMapReduce = (
  mealId: string,
  arr: ISelectedProductResponse[],
  key: FoodProductKeyType
) => {
  return filterMap(mealId, arr).reduce(
    (sum, curr) => sum + (curr[key] * curr.weight) / 100,
    0
  );
};

const modifyMealArrays = (
  mealsType: IMealResponse[],
  selectedProduct: ISelectedProductResponse[]
): IMealsData[] => {
  return mealsType.map(({ id, name }) => ({
    id,
    name,
    kcal: filterMapReduce(id, selectedProduct, "kcal"),
    protein: filterMapReduce(id, selectedProduct, "protein"),
    fat: filterMapReduce(id, selectedProduct, "fat"),
    carbs: filterMapReduce(id, selectedProduct, "carbs"),
    selectedProduct: filterMap(id, selectedProduct),
  }));
};

export default modifyMealArrays;
