import { format } from "date-fns";
import getMealsType from "../_api/getMealsType";
import getSelectedProductDay from "../_api/getSelectedProductDay";
import modifyMealArrays from "./modifyMealArrays";
import modifySummaryCalorieMacroData from "./modifySummaryCalorieMacroData";

const getMealsSummaryMacroData = async (date: Date) => {
  const mealsType = await getMealsType();
  const selectedProduct = await getSelectedProductDay(
    format(date, "yyyy-MM-dd")
  );

  if (mealsType?.data && selectedProduct?.data) {
    const mealsData = modifyMealArrays(mealsType.data, selectedProduct.data);
    const summaryData = modifySummaryCalorieMacroData(selectedProduct.data);

    return { mealsData, summaryData };
  }
  return { mealsData: undefined, summaryData: undefined };
};

export default getMealsSummaryMacroData;
