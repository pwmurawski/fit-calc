import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const putSelectedProduct = async (id: string, weight: number) => {
  const data = await fitCalcApi(`/selectedProduct/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weight }),
    credentials: "include",
  });
  return ResponseSchema.parse(data);
};

export default putSelectedProduct;
