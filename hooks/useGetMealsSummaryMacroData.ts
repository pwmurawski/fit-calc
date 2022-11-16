import { useContext, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import getMealsType from "../api/getMealsType";
import getSelectedProductDay from "../api/getSelectedProduct";
import GlobalContext from "../context/GlobalContext/GlobalContext";
import modifyMealArrays from "../helpers/modifyMealArrays";
import modifySummaryCalorieMacroData from "../helpers/modifySummaryCalorieMacroData";

const useGetMealsSummaryMacroData = () => {
  const { state } = useContext(GlobalContext);
  const { data: mealsType } = useSWRImmutable("/meals", getMealsType);
  const { data: selectedProduct } = useSWRImmutable(
    `/selectedProduct/day/${state.date?.toLocaleDateString()}`,
    () => getSelectedProductDay(state.date?.toLocaleDateString())
  );

  const memoizedValue = useMemo(() => {
    if (mealsType?.data && selectedProduct?.data) {
      const mealsData = modifyMealArrays(mealsType.data, selectedProduct.data);
      const summaryData = modifySummaryCalorieMacroData(selectedProduct.data);
      return { mealsData, summaryData };
    }
    return { mealsData: undefined, summaryData: undefined };
  }, [mealsType, selectedProduct]);

  return memoizedValue;
};

export default useGetMealsSummaryMacroData;
