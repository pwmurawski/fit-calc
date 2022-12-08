import { IFoodProductData } from "../types/IFoodProductDataTypes";
import fitCalcApi from "./fitCalcApi";

const getFoodProduct = async (id: string) => {
  const data = await fitCalcApi<IFoodProductData>(`/foodProducts/${id}`);
  return data;
};

export default getFoodProduct;
