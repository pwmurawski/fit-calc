import { format } from "date-fns";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import getSelectedProductDay from "../_api/getSelectedProductDay";
import postSelectedProduct from "../_api/postSelectedProduct";
import { IBodySelectedProduct } from "../types/SelectedProductTypes";
import useDate from "./useDate";
import useLoading from "./useLoading";
import useMealId from "./useMealId";

const useAddFoodProductToMeal = () => {
  const { back, push } = useRouter();
  const { mutate } = useSWRConfig();
  const { setLoading } = useLoading();
  const { mealId } = useMealId();
  const { date } = useDate();
  const formatDate = format(date, "yyyy-MM-dd");

  const addFoodProductToMeal = async (
    foodProductId: string,
    weight: number
  ) => {
    setLoading(true);
    if (mealId) {
      const data: IBodySelectedProduct = {
        foodProductId,
        mealId,
        weight,
        dateTime: formatDate,
      };

      const res = await postSelectedProduct(data);
      if (res?.status === 200) {
        mutate(
          `/selectedProduct/day/${formatDate}`,
          getSelectedProductDay(formatDate)
        );
        back();
      }
    } else push("/");
    setLoading(false);
  };

  return addFoodProductToMeal;
};

export default useAddFoodProductToMeal;
