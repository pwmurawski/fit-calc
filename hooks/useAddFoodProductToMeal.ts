import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import getSelectedProductDay from "../api/getSelectedProductDay";
import postSelectedProduct from "../api/postSelectedProduct";
import { IBodySelectedProduct } from "../types/SelectedProductTypes";
import useDate from "./useDate";
import useLoading from "./useLoading";
import useMealId from "./useMealId";

const useAddFoodProductToMeal = () => {
  const { back, push } = useRouter();
  const { mutate } = useSWRConfig();
  const { setLoading } = useLoading();
  const { date } = useDate();
  const { mealId } = useMealId();

  const addFoodProductToMeal = async (
    foodProductId: string,
    weight: number
  ) => {
    setLoading(true);
    if (mealId && date) {
      const data: IBodySelectedProduct = {
        foodProductId,
        mealId,
        weight,
        dateTime: date.toLocaleDateString(),
      };

      const res = await postSelectedProduct(data);
      if (res?.status === 200) {
        mutate(
          `/selectedProduct/day/${date.toLocaleDateString()}`,
          getSelectedProductDay(date.toLocaleDateString())
        );
        back();
      }
    } else push("/");
    setLoading(false);
  };

  return addFoodProductToMeal;
};

export default useAddFoodProductToMeal;
