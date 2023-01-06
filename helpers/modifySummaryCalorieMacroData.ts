import { FoodProductKeyType } from "../types/FoodProductTypes";
import { SelectedProductType } from "../types/SelectedProductTypes";
import { ISummaryCalorieMacroData } from "../types/ISummaryCalorieMacroData";

const sumMacro = (
  selectedProducts: SelectedProductType[],
  key: FoodProductKeyType
) => {
  return selectedProducts.reduce(
    (sum, curr) => sum + (curr.foodProduct[key] * curr.weight) / 100,
    0
  );
};

const modifySummaryCalorieMacroData = (
  selectedProducts: SelectedProductType[]
): ISummaryCalorieMacroData => {
  return {
    kcal: sumMacro(selectedProducts, "kcal"),
    protein: sumMacro(selectedProducts, "protein"),
    fat: sumMacro(selectedProducts, "fat"),
    carbs: sumMacro(selectedProducts, "carbs"),
  };
};

export default modifySummaryCalorieMacroData;
