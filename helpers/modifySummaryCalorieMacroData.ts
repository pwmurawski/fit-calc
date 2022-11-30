import { FoodProductKeyType } from "../interfaces/IFoodProductData";
import { ISelectedProductResponse } from "../interfaces/ISelectedProduct";
import { ISummaryCalorieMacroData } from "../interfaces/ISummaryCalorieMacroData";

const reduce = (arr: ISelectedProductResponse[], key: FoodProductKeyType) => {
  return arr.reduce(
    (sum, curr) => sum + (curr.foodProduct[key] * curr.weight) / 100,
    0
  );
};

const modifySummaryCalorieMacroData = (
  arr: ISelectedProductResponse[]
): ISummaryCalorieMacroData => {
  return {
    kcal: reduce(arr, "kcal"),
    limitKcal: 2600,
    protein: reduce(arr, "protein"),
    limitProtein: 160,
    fat: reduce(arr, "fat"),
    limitFat: 80,
    carbs: reduce(arr, "carbs"),
    limitCarbs: 400,
  };
};

export default modifySummaryCalorieMacroData;
