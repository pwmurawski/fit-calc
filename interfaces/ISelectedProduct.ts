import { IFoodProductData } from "./IFoodProductData";

export interface ISelectedProduct extends IFoodProductData {
  mealId: string;
  weight: number;
  selectedId: string;
  dateTime: string;
}
