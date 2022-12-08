import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import getMealsType from "../api/getMealsType";
import getSelectedProductDay from "../api/getSelectedProductDay";
import modifyMealArrays from "../helpers/modifyMealArrays";
import modifySummaryCalorieMacroData from "../helpers/modifySummaryCalorieMacroData";
import useDate from "./useDate";

const useGetMealsSummaryMacroData = () => {
  const { date } = useDate();
  const { data: mealsType } = useSWRImmutable("/meals", getMealsType);
  const { data: selectedProduct } = useSWRImmutable(
    `/selectedProduct/day/${date.toLocaleDateString()}`,
    () => getSelectedProductDay(date.toLocaleDateString())
  );

  const mealsSummaryMacroData = useMemo(() => {
    if (mealsType?.data && selectedProduct?.data) {
      const mealsData = modifyMealArrays(mealsType.data, selectedProduct.data);
      const summaryData = modifySummaryCalorieMacroData(selectedProduct.data);

      return { mealsData, summaryData };
    }

    return { mealsData: undefined, summaryData: undefined };
  }, [mealsType, selectedProduct]);

  return mealsSummaryMacroData;
};

export default useGetMealsSummaryMacroData;
