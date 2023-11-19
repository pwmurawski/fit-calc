import axios from 'axios';
import { BodyFoodProducts, CreateFoodProductResponse, FoodProductsResponse } from 'pages/api/foodProducts';
import { FoodProductResponse } from 'pages/api/foodProducts/foodProduct';
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
    const baseUrl = 'http://127.0.0.1:3000';
    try {
        const response = await axios.get<FoodProductResponse>(`${baseUrl}/api/foodProducts/foodProduct`, {
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