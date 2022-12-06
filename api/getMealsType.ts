import { IMealResponse } from "../types/IMealResponse";
import fitCalcApi from "./fitCalcApi";

const getMealsType = async () => {
  const data = await fitCalcApi<IMealResponse[]>("/meals", {
    credentials: "include",
  });
  return data;
};

export default getMealsType;
