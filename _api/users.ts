import { User } from '@prisma/client';
import axios from 'axios';
import { BodyUpdateUser } from 'pages/api/users';
import { BodyChangePasswordUser } from 'pages/api/users/change-password';
import { Response } from 'types/Response';

export const getUser = async (): Response<{ user: Omit<User, 'password'> }> => {
    try {
        const response = await axios.get<{ user: Omit<User, 'password'> }>('/api/users');
        if (response.data.user) {
            return { user: response.data.user, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const updateUser = async (body: BodyUpdateUser): Response<{ message: string }> => {
    try {
        const response = await axios.put<{ message: string }>('/api/users', body);
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const changePasswordUser = async (body: BodyChangePasswordUser): Response<{ message: string }> => {
    try {
        const response = await axios.put<{ message: string }>('/api/users/change-password', body);
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const getUsers = async (): Response<{ users: Omit<User, 'password'>[] }> => {
    try {
        const response = await axios.get<{ users: Omit<User, 'password'>[] }>('/api/admin/users');
        if (response.data.users) {
            return { users: response.data.users, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const resetPasswordAdmin = async (userId: string): Response<{ message: string }> => {
    try {
        const response = await axios.put<{ message: string }>('/api/admin/users/reset-password', undefined, {
            params: { userId },
        });
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const resetPassword = async (code: string, newPassword: string): Response<{ message: string }> => {
    try {
        const response = await axios.put<{ message: string }>('/api/users/reset-password', { code, newPassword });
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const sendEmailResetPassword = async (email: string): Response<{ message: string }> => {
    try {
        const response = await axios.get<{ message: string }>('/api/users/send-email-reset-password', {
            params: { email },
        });
        if (response.data.message) {
            return { message: response.data.message, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};
