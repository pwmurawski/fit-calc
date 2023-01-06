import { z } from "zod";
import { ResponseSchema } from "../types/ResponseTypes";
import { IBodySelectedProduct } from "../types/SelectedProductTypes";
import fitCalcApi from "./fitCalcApi";

const postSelectedProduct = async (body: IBodySelectedProduct) => {
  const data = await fitCalcApi("/selectedProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return ResponseSchema.and(
    z.object({ data: z.object({ id: z.string() }).optional() }).optional()
  ).parse(data);
};

export default postSelectedProduct;
