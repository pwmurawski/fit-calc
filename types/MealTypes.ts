import { ISelectedProduct } from './SelectedProductTypes';

export interface MealType {
    id: string;
    name: string;
}

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
