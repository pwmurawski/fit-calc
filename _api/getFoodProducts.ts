import { ResponseFoodProductsSchema } from "../types/FoodProductTypes";
import fitCalcApi from "./fitCalcApi";

const getFoodProducts = async () => {
  const data = await fitCalcApi("/foodProducts");

  return ResponseFoodProductsSchema.parse(data);
};

export default getFoodProducts;
