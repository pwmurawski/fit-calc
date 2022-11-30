import { IFoodProductData } from "./IFoodProductData";
import { IMealResponse } from "./IMealResponse";

export interface ISelectedProductResponse {
  id: string;
  userId: string;
  weight: number;
  foodProduct: IFoodProductData;
  meal: IMealResponse;
  dateTime: string;
}

export interface ISelectedProduct extends IFoodProductData {
  mealId: string;
  weight: number;
  selectedId: string;
  dateTime: string;
}
