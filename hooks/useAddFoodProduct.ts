import { useRouter } from "next/router";
import postFoodProduct from "../api/postFoodProduct";
import revalidate from "../helpers/revalidate";
import { IAddFoodProductFormVal } from "../interfaces/IAddFoodProductFormVal";

const useAddFoodProduct = () => {
  const { back, prefetch } = useRouter();

  const addFoodProduct = async (data: IAddFoodProductFormVal) => {
    const res = await postFoodProduct(data);
    if (res?.status === 200) {
      await revalidate("/foodProducts");
      await prefetch("/foodProducts", undefined, { priority: true });
      back();
    }
    return res;
  };

  return addFoodProduct;
};

export default useAddFoodProduct;
