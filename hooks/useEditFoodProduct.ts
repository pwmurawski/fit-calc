import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getFoodProduct from "../api/getFoodProduct";
import putFoodProduct from "../api/putFoodProduct";
import revalidate from "../helpers/revalidate";
import {
  IFoodProductFormValue,
  DefaultValueType,
} from "../types/FoodProductFormTypes";

const useEditFoodProduct = (id: string) => {
  const { back, prefetch } = useRouter();
  const [defaultValue, setDefaultValue] = useState<DefaultValueType>();

  const getData = async () => {
    const res = await getFoodProduct(id);

    if (res?.data) {
      setDefaultValue({
        name: res.data.name,
        kcal: res.data.kcal.toString(),
        protein: res.data.protein.toString(),
        fat: res.data.fat.toString(),
        carbs: res.data.carbs.toString(),
        code: res.data.code,
      });
    }
  };

  const editFoodProduct = async (data: IFoodProductFormValue) => {
    const res = await putFoodProduct(id, data);
    if (res?.status === 204) {
      await revalidate(`/foodProducts/${id}`);
      await prefetch(`/foodProducts/${id}`, undefined, { priority: true });
      await revalidate("/foodProducts");
      await prefetch("/foodProducts", undefined, { priority: true });
      back();
    }
    return res;
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    defaultValue,
    editFoodProduct,
  };
};

export default useEditFoodProduct;
