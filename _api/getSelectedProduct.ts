import { ResponseSelectedProductSchema } from "../types/SelectedProductTypes";
import fitCalcApi from "./fitCalcApi";

const getSelectedProduct = async (id: string) => {
  const data = await fitCalcApi(`/selectedProduct/${id}`, {
    credentials: "include",
  });

  return ResponseSelectedProductSchema.parse(data);
};

export default getSelectedProduct;
