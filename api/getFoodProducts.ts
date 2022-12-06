import { IFoodProductData } from "../types/IFoodProductData";
import fitCalcApi from "./fitCalcApi";

const getFoodProducts = async () => {
  const data = await fitCalcApi<IFoodProductData[]>("/foodProducts");
  return data;
};

export default getFoodProducts;
