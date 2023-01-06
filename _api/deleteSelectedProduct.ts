import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const deleteSelectedProduct = async (id: string) => {
  const data = await fitCalcApi(`/selectedProduct/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return ResponseSchema.parse(data);
};

export default deleteSelectedProduct;
