import { FoodProductType } from './FoodProductTypes';
import { MealType } from './MealTypes';

export interface SelectedProductType {
    id: string;
    userId: string;
    weight: number;
    foodProduct: Omit<FoodProductType, 'id' | 'userId'>;
    meal: MealType;
    dateTime: Date;
}

export interface SelectedProduct extends FoodProductType {
    mealId: string;
    weight: number;
    dateTime: string;
}

export interface IBodySelectedProduct {
    mealId: string;
    foodProductId: string;
    weight: number;
    dateTime: string;
}
