import { ResponseSelectedProductDaySchema } from "../types/SelectedProductTypes";
import fitCalcApi from "./fitCalcApi";

const getSelectedProductDay = async (date?: string) => {
  const data = await fitCalcApi(`/selectedProduct/day/${date}`, {
    credentials: "include",
  });

  return ResponseSelectedProductDaySchema.parse(data);
};

export default getSelectedProductDay;
