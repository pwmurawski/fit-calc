import { IMealData } from "./IMealData";
import { ISelectedProduct } from "./ISelectedProduct";

export interface IMealsData extends IMealData {
  selectedProduct: ISelectedProduct[];
}
