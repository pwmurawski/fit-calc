import { SelectedProduct } from '@prisma/client';
import axios from 'axios';
import { Response } from 'types/Response';
import {
    DeleteSelectedProductResponse,
    SelectedProductIdResponse,
    SelectedProductResponse,
} from 'types/SelectedProduct';

export type BodySelectedProduct = Omit<SelectedProduct, 'id' | 'userId' | 'dateTime'> & { dateTime: string };

export const getSelectedProduct = async (id: string): Response<SelectedProductResponse> => {
    try {
        const response = await axios.get<SelectedProductResponse>('/api/selectedProducts', { params: { id } });
        if (response.data.selectedProduct) {
            return { selectedProduct: response.data.selectedProduct, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const postSelectedProduct = async (body: BodySelectedProduct): Response<SelectedProductIdResponse> => {
    try {
        const response = await axios.post<SelectedProductIdResponse>('/api/selectedProducts', body);
        if (response.data.id) {
            return { id: response.data.id, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const putSelectedProduct = async (
    id: string,
    body: Pick<BodySelectedProduct, 'weight'>,
): Response<SelectedProductIdResponse> => {
    try {
        const response = await axios.put<SelectedProductIdResponse>('/api/selectedProducts', body, { params: { id } });
        if (response.data.id) {
            return { id: response.data.id, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const deleteSelectedProduct = async (id: string): Response<DeleteSelectedProductResponse> => {
    try {
        const response = await axios.delete<DeleteSelectedProductResponse>('/api/selectedProducts', { params: { id } });
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};
