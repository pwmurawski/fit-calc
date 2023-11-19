import { SelectedProductType } from './SelectedProduct';

export interface MealData {
    id: string;
    name: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface MealsData extends MealData {
    selectedProduct: SelectedProductType[];
}
