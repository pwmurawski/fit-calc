export interface IFoodProductData {
  id: string;
  userId: string;
  code?: string;
  name: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export type FoodProductKeyType = keyof Pick<
  IFoodProductData,
  "kcal" | "protein" | "fat" | "carbs"
>;
