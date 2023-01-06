import { z } from "zod";
import { FoodProductSchema, FoodProductType } from "./FoodProductTypes";
import { MealTypeSchema } from "./MealTypes";
import { ResponseSchema } from "./ResponseTypes";

export const SelectedProductSchema = z.object({
  id: z.string(),
  userId: z.string(),
  weight: z.number(),
  foodProduct: FoodProductSchema.omit({ id: true, userId: true }),
  meal: MealTypeSchema,
  dateTime: z.string(),
});

export const ResponseSelectedProductSchema = ResponseSchema.and(
  z
    .object({
      data: SelectedProductSchema.optional(),
    })
    .optional()
);

export const ResponseSelectedProductDaySchema = ResponseSchema.and(
  z
    .object({
      data: z.array(SelectedProductSchema).optional(),
    })
    .optional()
);

export type SelectedProductType = z.infer<typeof SelectedProductSchema>;

export interface ISelectedProduct extends FoodProductType {
  mealId: string;
  weight: number;
  dateTime: string;
}

export interface IBodySelectedProduct {
  mealId: string;
  foodProductId: string;
  weight: number;
  dateTime: string;
}
