import { FoodProduct } from '@prisma/client';

export type FoodProductType = FoodProduct & { lastSelectedProductWeight: number | null; verifiedFoodProduct: boolean };
export type FoodProductKeyType = keyof Pick<FoodProductType, 'kcal' | 'protein' | 'fat' | 'carbs'>;

export type BodyFoodProducts = Record<keyof Omit<FoodProduct, 'id' | 'userId' | 'code'>, string> & { code?: string };
export type CreateFoodProductResponse = { id: string };
export type FoodProductsResponse = { foodProducts: FoodProductType[] };
export type FoodProductResponse = {
    foodProduct:
        | (FoodProduct & {
              lastSelectedProducts: { id: string; weight: number; kcal: number }[];
              verifiedFoodProduct: boolean;
          })
        | null;
};
export type DeleteFoodProductResponse = { message: string };
export type FoodProductsAdmin = Array<FoodProduct & { verifiedFoodProduct: boolean; blockedFoodProduct: boolean }>;
export type FoodProductsAdminTableResponse = {
    foodProducts: FoodProductsAdmin;
};
export type FoodProductsCheckResponse = {
    ids: {
        [x: string]: boolean;
    };
};
export enum Action {
    Create = 'Create',
    Edit = 'Edit',
}
export type ImportFoodProductAdmin = Array<
    Record<keyof Omit<FoodProduct, 'userId'> | 'user' | 'verifiedFoodProduct' | 'blockedFoodProduct' | 'action', string>
>;
