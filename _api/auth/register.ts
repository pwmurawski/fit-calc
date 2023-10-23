import axios from 'axios';
import { RegisterResponse } from 'pages/api/auth/register';
import { RegisterData } from 'types/Auth';
import { Response } from 'types/Response';

const register = async (body: Partial<RegisterData>): Response<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterData, { data: RegisterResponse }>('/api/auth/register', body);
        if (response.data.user) {
            return { user: response.data.user, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response.data.error, status: 'ERROR' };
    }
};

export default register;
