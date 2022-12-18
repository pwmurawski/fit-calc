import { ISelectedProductResponse } from "../types/SelectedProductTypes";
import fitCalcApi from "./fitCalcApi";

const getSelectedProduct = async (id: string) => {
  const data = await fitCalcApi<ISelectedProductResponse>(
    `/selectedProduct/${id}`,
    { credentials: "include" }
  );
  return data;
};

export default getSelectedProduct;
