import { ISelectedProductResponse } from "../types/ISelectedProduct";
import fitCalcApi from "./fitCalcApi";

const getSelectedProductDay = async (date?: string) => {
  const data = await fitCalcApi<ISelectedProductResponse[]>(
    `/selectedProduct/day/${date}`,
    { credentials: "include" }
  );
  return data;
};

export default getSelectedProductDay;
