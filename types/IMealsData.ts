import { ISelectedProduct } from "./ISelectedProduct";

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
