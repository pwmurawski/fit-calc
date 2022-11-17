import { useRouter } from "next/router";
import { useContext } from "react";
import { useSWRConfig } from "swr";
import getSelectedProductDay from "../api/getSelectedProduct";
import postSelectedProduct from "../api/postSelectedProduct";
import GlobalContext from "../context/GlobalContext/GlobalContext";
import { IBodySelectedProduct } from "../interfaces/IBodySelectedProduct";

const useAddFoodProductToMeal = () => {
  const { state } = useContext(GlobalContext);
  const { back, push } = useRouter();
  const { mutate } = useSWRConfig();

  const addFoodProductToMeal = async (
    foodProductId: string,
    weight: string
  ) => {
    if (state.mealId && state.date) {
      const data: IBodySelectedProduct = {
        foodProductId,
        mealId: state.mealId,
        weight,
        dateTime: state.date.toLocaleDateString(),
      };

      const res = await postSelectedProduct(data);
      if (res?.status === 200) {
        mutate(
          `/selectedProduct/day/${state.date.toLocaleDateString()}`,
          getSelectedProductDay(state.date?.toLocaleDateString())
        );
        back();
      }
    } else push("/");
  };

  return addFoodProductToMeal;
};

export default useAddFoodProductToMeal;
