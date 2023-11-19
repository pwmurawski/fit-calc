import axios from 'axios';
import {
    BodyFoodProducts,
    CreateFoodProductResponse,
    FoodProductResponse,
    FoodProductsResponse,
} from 'types/FoodProduct';
import { Response } from 'types/Response';

export const getFoodProducts = async (): Response<FoodProductsResponse> => {
    try {
        const response = await axios.get<FoodProductsResponse>('/api/foodProducts');
        if (response.data.foodProducts) {
            return { foodProducts: response.data.foodProducts, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const getFoodProduct = async (id: string): Response<FoodProductResponse> => {
    try {
        const response = await axios.get<FoodProductResponse>('/api/foodProducts/foodProduct', {
            params: { id },
        });
        if (response.data.foodProduct) {
            return { foodProduct: response.data.foodProduct, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const postFoodProduct = async (body: BodyFoodProducts): Response<CreateFoodProductResponse> => {
    try {
        const response = await axios.post<CreateFoodProductResponse>('/api/foodProducts', body);
        if (response.data.id) {
            return { id: response.data.id, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const putFoodProduct = async (id: string, body: BodyFoodProducts): Response<CreateFoodProductResponse> => {
    try {
        const response = await axios.put<CreateFoodProductResponse>('/api/foodProducts', body, {
            params: { id },
        });
        if (response.data.id) {
            return { id: response.data.id, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const searchFoodProducts = async (term?: string): Response<FoodProductsResponse> => {
    try {
        const response = await axios.get<FoodProductsResponse>('/api/foodProducts/search', { params: { term } });
        if (response.data.foodProducts) {
            return { foodProducts: response.data.foodProducts, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};
