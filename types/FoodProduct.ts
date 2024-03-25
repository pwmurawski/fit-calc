import { FoodProduct } from '@prisma/client';

export type FoodProductType = FoodProduct & { lastSelectedProduct: { weight?: number } };
export type FoodProductKeyType = keyof Pick<FoodProductType, 'kcal' | 'protein' | 'fat' | 'carbs'>;

export type BodyFoodProducts = Record<keyof Omit<FoodProduct, 'id' | 'userId' | 'code'>, string> & { code?: string };
export type CreateFoodProductResponse = { id: string };
export type FoodProductsResponse = { foodProducts: FoodProductType[] };
export type FoodProductResponse = {
    foodProduct: (FoodProduct & { lastSelectedProducts: { id: string; weight: number; kcal: number }[] }) | null;
};
export type DeleteFoodProductResponse = { message: string };
export type FoodProductsAdmin = Array<FoodProduct & { verifiedFoodProduct: boolean; blockedFoodProduct: boolean }>;
export type FoodProductsAdminTableResponse = {
    foodProducts: FoodProductsAdmin;
};
