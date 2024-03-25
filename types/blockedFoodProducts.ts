import { BlockedFoodProduct } from '@prisma/client';

export interface BlockedFoodProductsResponse {
    foodProducts: BlockedFoodProduct[];
}
export interface BlockedFoodProductsBody {
    foodProductId: string;
}
export type CreateBlockedFoodProductsResponse = { id: string };
export type DeleteBlockedFoodProductsResponse = { message: string };
