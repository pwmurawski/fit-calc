import { ResponseFoodProductSchema } from "../types/FoodProductTypes";
import fitCalcApi from "./fitCalcApi";

const getFoodProduct = async (id: string) => {
  const data = await fitCalcApi(`/foodProducts/${id}`);

  return ResponseFoodProductSchema.parse(data);
};

export default getFoodProduct;
