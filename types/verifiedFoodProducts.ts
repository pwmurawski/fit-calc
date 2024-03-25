import { VerifiedFoodProduct } from '@prisma/client';

export interface VerifiedFoodProductsResponse {
    foodProducts: VerifiedFoodProduct[];
}
export interface VerifiedFoodProductsBody {
    foodProductId: string;
}
export type CreateVerifiedFoodProductsResponse = { id: string };
export type DeleteVerifiedFoodProductsResponse = { message: string };
