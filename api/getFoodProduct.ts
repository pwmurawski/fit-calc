import { IFoodProductData } from "../types/IFoodProductData";
import fitCalcApi from "./fitCalcApi";

const getFoodProduct = async (id: string) => {
  const data = await fitCalcApi<IFoodProductData>(`/foodProducts/${id}`);
  return data;
};

export default getFoodProduct;
