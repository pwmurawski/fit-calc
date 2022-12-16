import { FoodProductKeyType } from "../types/IFoodProductDataTypes";
import { ISelectedProductResponse } from "../types/SelectedProductTypes";
import { ISummaryCalorieMacroData } from "../types/ISummaryCalorieMacroData";

const sumMacro = (
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
    kcal: sumMacro(selectedProducts, "kcal"),
    protein: sumMacro(selectedProducts, "protein"),
    fat: sumMacro(selectedProducts, "fat"),
    carbs: sumMacro(selectedProducts, "carbs"),
  };
};

export default modifySummaryCalorieMacroData;
