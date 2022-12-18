import { IFoodProductFormValue, KeysType } from "../types/FoodProductFormTypes";
import fitCalcApi from "./fitCalcApi";

const putFoodProduct = async (id: string, body?: IFoodProductFormValue) => {
  const data = await fitCalcApi<null, KeysType>(`/foodProduct/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return data;
};

export default putFoodProduct;
