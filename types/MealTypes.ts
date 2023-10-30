import { SelectedProduct } from './SelectedProductTypes';

export interface MealType {
    id: string;
    name: string;
}

export interface MealData {
    id: string;
    name: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface MealsData extends MealData {
    selectedProduct: SelectedProduct[];
}
