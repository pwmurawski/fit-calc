import { User } from '@prisma/client';
import axios from 'axios';
import { Response } from 'types/Response';

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
