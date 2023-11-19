import { FoodProduct, SelectedProduct, Meal } from '@prisma/client';

export type SelectedProductWithFoodProductAndMeal = Omit<SelectedProduct, 'mealId' | 'foodProductId'> & {
    foodProduct: Omit<FoodProduct, 'id' | 'userId'>;
    meal: Meal;
};
export type SelectedProductType = FoodProduct &
    Pick<SelectedProduct, 'mealId' | 'weight'> & {
        dateTime: string;
    };

export type BodySelectedProduct = Record<keyof Omit<SelectedProduct, 'id' | 'userId'>, string>;
export type SelectedProductIdResponse = {
    id: string;
};
export type SelectedProductResponse = {
    selectedProduct: (SelectedProduct & { foodProduct: Omit<FoodProduct, 'id' | 'userId'> }) | null;
};
export type DeleteSelectedProductResponse = {
    message: string;
};
