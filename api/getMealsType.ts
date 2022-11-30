import { IMealResponse } from "../interfaces/IMealResponse";
import fitCalcApi from "./fitCalcApi";

const getMealsType = async () => {
  const data = await fitCalcApi<IMealResponse[]>("/meals", {
    credentials: "include",
  });
  return data;
};

export default getMealsType;
