import { useRouter } from "next/router";
import postFoodProduct from "../api/postFoodProduct";
import { IAddFoodProductFormVal } from "../interfaces/IAddFoodProductFormVal";

const useAddFoodProduct = () => {
  const { back } = useRouter();

  const addFoodProduct = async (data: IAddFoodProductFormVal) => {
    const res = await postFoodProduct(data);
    if (res?.status === 200) {
      back();
    }
    return res;
  };

  return addFoodProduct;
};

export default useAddFoodProduct;
