import { z } from "zod";
import { ResponseSchema } from "./ResponseTypes";

export const FoodProductSchema = z.object({
  id: z.string(),
  userId: z.string(),
  code: z.string().optional(),
  name: z.string(),
  kcal: z.number(),
  protein: z.number(),
  fat: z.number(),
  carbs: z.number(),
});

export const ResponseFoodProductSchema = ResponseSchema.and(
  z
    .object({
      data: FoodProductSchema.optional(),
    })
    .optional()
);

export const ResponseFoodProductsSchema = ResponseSchema.and(
  z
    .object({
      data: z.array(FoodProductSchema).optional(),
    })
    .optional()
);

export type FoodProductType = z.infer<typeof FoodProductSchema>;

export type FoodProductKeyType = keyof Pick<
  FoodProductType,
  "kcal" | "protein" | "fat" | "carbs"
>;
