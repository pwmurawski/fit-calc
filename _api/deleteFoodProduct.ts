import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const deleteFoodProduct = async (id: string) => {
  const data = await fitCalcApi(`/foodProduct/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return ResponseSchema.parse(data);
};

export default deleteFoodProduct;
