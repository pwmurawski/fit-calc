import getMealsType from "../api/getMealsType";
import getSelectedProductDay from "../api/getSelectedProductDay";
import modifyMealArrays from "./modifyMealArrays";
import modifySummaryCalorieMacroData from "./modifySummaryCalorieMacroData";

const getMealsSummaryMacroData = async (date?: Date) => {
  const mealsType = await getMealsType();
  const selectedProduct = await getSelectedProductDay(
    date?.toLocaleDateString()
  );

  if (mealsType?.data && selectedProduct?.data) {
    const mealsData = modifyMealArrays(mealsType.data, selectedProduct.data);
    const summaryData = modifySummaryCalorieMacroData(selectedProduct.data);

    return { mealsData, summaryData };
  }
  return { mealsData: undefined, summaryData: undefined };
};

export default getMealsSummaryMacroData;
