import { IFoodProductFormValue, KeysType } from "../types/FoodProductFormTypes";
import fitCalcApi from "./fitCalcApi";

const postFoodProduct = async (body?: IFoodProductFormValue) => {
  const data = await fitCalcApi<{ id: string }, KeysType>("/foodProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return data;
};

export default postFoodProduct;
