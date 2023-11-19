import axios from 'axios';
import { BodyRegister, RegisterResponse } from 'types/Auth';
import { Response } from 'types/Response';

export const register = async (body: Partial<BodyRegister>): Response<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>('/api/auth/register', body);
        if (response.data.user) {
            return { user: response.data.user, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response.data.error, status: 'ERROR' };
    }
};
