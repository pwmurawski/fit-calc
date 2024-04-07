import { FoodProduct, SelectedProduct, Meal } from '@prisma/client';

export type SelectedProductWithFoodProductAndMeal = Omit<SelectedProduct, 'mealId' | 'foodProductId'> & {
    meal: Meal;
};
export type SelectedProductType = FoodProduct &
    Pick<SelectedProduct, 'mealId' | 'weight'> & {
        dateTime: string;
    };

export type BodySelectedProduct = Record<
    keyof Pick<SelectedProduct, 'mealId' | 'foodProductId' | 'weight' | 'dateTime'>,
    string
>;
export type SelectedProductIdResponse = {
    id: string;
};
export type SelectedProductResponse = {
    selectedProduct: SelectedProduct | null;
};
export type DeleteSelectedProductResponse = {
    message: string;
};
