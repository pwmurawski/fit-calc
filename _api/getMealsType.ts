import { ResponseMealsSchema } from "../types/MealTypes";
import fitCalcApi from "./fitCalcApi";

const getMealsType = async () => {
  const data = await fitCalcApi("/meals", {
    credentials: "include",
  });

  return ResponseMealsSchema.parse(data);
};

export default getMealsType;
