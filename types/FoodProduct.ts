import { FoodProduct } from '@prisma/client';

export type FoodProductType = FoodProduct;
export type FoodProductKeyType = keyof Pick<FoodProductType, 'kcal' | 'protein' | 'fat' | 'carbs'>;

export type BodyFoodProducts = Record<keyof Omit<FoodProduct, 'id' | 'userId' | 'code'>, string> & { code?: string };
export type CreateFoodProductResponse = { id: string };
export type FoodProductsResponse = { foodProducts: FoodProduct[] };
export type FoodProductResponse = { foodProduct: FoodProduct | null };
