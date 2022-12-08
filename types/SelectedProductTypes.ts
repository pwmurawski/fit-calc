import { IFoodProductData } from "./IFoodProductDataTypes";
import { IMealResponse } from "./IMealResponse";

export interface ISelectedProduct extends IFoodProductData {
  mealId: string;
  weight: number;
  dateTime: string;
}

export interface ISelectedProductResponse {
  id: string;
  userId: string;
  weight: number;
  foodProduct: Omit<IFoodProductData, "id" | "userId">;
  meal: IMealResponse;
  dateTime: string;
}

export interface IBodySelectedProduct {
  mealId: string;
  foodProductId: string;
  weight: number;
  dateTime: string;
}
