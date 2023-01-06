import { z } from "zod";
import { ResponseSchema } from "./ResponseTypes";
import { ISelectedProduct } from "./SelectedProductTypes";

export const MealTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ResponseMealsSchema = ResponseSchema.and(
  z
    .object({
      data: z.array(MealTypeSchema).optional(),
    })
    .optional()
);

export type MealType = z.infer<typeof MealTypeSchema>;

export interface IMealData {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface IMealsData extends IMealData {
  selectedProduct: ISelectedProduct[];
}
