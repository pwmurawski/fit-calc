import { FoodProductKeyType } from "../types/IFoodProductDataTypes";
import { ISelectedProductResponse } from "../types/SelectedProductTypes";
import { ISummaryCalorieMacroData } from "../types/ISummaryCalorieMacroData";

const reduce = (
  selectedProducts: ISelectedProductResponse[],
  key: FoodProductKeyType
) => {
  return selectedProducts.reduce(
    (sum, curr) => sum + (curr.foodProduct[key] * curr.weight) / 100,
    0
  );
};

const modifySummaryCalorieMacroData = (
  selectedProducts: ISelectedProductResponse[]
): ISummaryCalorieMacroData => {
  return {
    kcal: reduce(selectedProducts, "kcal"),
    limitKcal: 2600,
    protein: reduce(selectedProducts, "protein"),
    limitProtein: 160,
    fat: reduce(selectedProducts, "fat"),
    limitFat: 80,
    carbs: reduce(selectedProducts, "carbs"),
    limitCarbs: 400,
  };
};

export default modifySummaryCalorieMacroData;
