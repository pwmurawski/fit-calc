import axios from 'axios';
import {
    BodyFoodProducts,
    CreateFoodProductResponse,
    DeleteFoodProductResponse,
    FoodProductResponse,
    FoodProductsAdminTableResponse,
    FoodProductsCheckResponse,
    FoodProductsResponse,
    ImportFoodProductAdmin,
} from 'types/FoodProduct';
import { Response } from 'types/Response';
import {
    BlockedFoodProductsBody,
    CreateBlockedFoodProductsResponse,
    DeleteBlockedFoodProductsResponse,
} from 'types/blockedFoodProducts';
import {
    CreateVerifiedFoodProductsResponse,
    DeleteVerifiedFoodProductsResponse,
    VerifiedFoodProductsBody,
} from 'types/verifiedFoodProducts';

export const getAllFoodProducts = async (
    page?: number,
    pageSize?: number,
    blocked?: boolean,
): Response<FoodProductsAdminTableResponse> => {
    try {
        const response = await axios.get<FoodProductsAdminTableResponse>('/api/admin/foodProducts', {
            params: { page, pageSize, blocked },
        });
        if (response.data.foodProducts) {
            return { ...response.data, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const getFoodProducts = async (page: number = 1): Response<FoodProductsResponse> => {
    try {
        const response = await axios.get<FoodProductsResponse>('/api/foodProducts', { params: { page } });
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

export const deleteFoodProduct = async (id: string): Response<CreateFoodProductResponse> => {
    try {
        const response = await axios.delete<CreateFoodProductResponse>('/api/foodProducts', {
            params: { id },
        });
        if (response.data.id) {
            return { id: response.data.id, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const putFoodProductAdmin = async (id: string, body: BodyFoodProducts): Response<CreateFoodProductResponse> => {
    try {
        const response = await axios.put<CreateFoodProductResponse>('/api/admin/foodProducts', body, {
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

export const verifiedFoodProducts = async (
    body: VerifiedFoodProductsBody,
): Response<CreateVerifiedFoodProductsResponse> => {
    try {
        const response = await axios.post<CreateVerifiedFoodProductsResponse>('/api/admin/foodProducts/verified', body);
        if (response.data.id) {
            return { id: response.data.id, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const unVerifiedFoodProducts = async (foodProductId: string): Response<DeleteVerifiedFoodProductsResponse> => {
    try {
        const response = await axios.delete<DeleteVerifiedFoodProductsResponse>('/api/admin/foodProducts/verified', {
            params: { foodProductId },
        });
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const blockedFoodProducts = async (
    body: BlockedFoodProductsBody,
): Response<CreateBlockedFoodProductsResponse> => {
    try {
        const response = await axios.post<CreateBlockedFoodProductsResponse>('/api/admin/foodProducts/blocked', body);
        if (response.data.id) {
            return { id: response.data.id, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const unBlockedFoodProducts = async (foodProductId: string): Response<DeleteBlockedFoodProductsResponse> => {
    try {
        const response = await axios.delete<DeleteBlockedFoodProductsResponse>('/api/admin/foodProducts/blocked', {
            params: { foodProductId },
        });
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const deleteFoodProductAdmin = async (foodProductId: string): Response<DeleteFoodProductResponse> => {
    try {
        const response = await axios.delete<DeleteFoodProductResponse>('/api/admin/foodProducts', {
            params: { id: foodProductId },
        });
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const exportFoodProducts = async (): Response<{ csv: string }> => {
    try {
        const response = await axios.get<{ csv: string }>('/api/admin/foodProducts/export');
        if (response.data.csv) {
            return { csv: response.data.csv, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const importFoodProducts = async (data: ImportFoodProductAdmin): Response<{ message: string }> => {
    try {
        const response = await axios.post<{ message: string }>('/api/admin/foodProducts/import', data);
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const checkExistFoodProducts = async (foodProductIds: string[]): Response<FoodProductsCheckResponse> => {
    try {
        const response = await axios.post<FoodProductsCheckResponse>('/api/admin/foodProducts/check', foodProductIds);
        if (response.data.ids) {
            return { ids: response.data.ids, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};
