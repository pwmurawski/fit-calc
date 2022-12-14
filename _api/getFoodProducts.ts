import { IFoodProductData } from "../types/IFoodProductDataTypes";
import fitCalcApi from "./fitCalcApi";

const getFoodProducts = async () => {
  const data = await fitCalcApi<IFoodProductData[]>("/foodProducts");
  return data;
};

export default getFoodProducts;
