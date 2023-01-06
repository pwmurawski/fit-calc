import { z } from "zod";
import { IFoodProductFormValue } from "../types/FoodProductFormTypes";
import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const postFoodProduct = async (body?: IFoodProductFormValue) => {
  const data = await fitCalcApi("/foodProduct", {
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

export default postFoodProduct;
