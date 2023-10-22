import axios from 'axios';
import { RegisterResponse } from 'pages/api/auth/register';
import { RegisterData } from 'types/Auth';

const register = async (body: RegisterData) => {
    try {
        const response = await axios.post<RegisterData, { data: RegisterResponse }>('/api/auth/register', body);
        if (response.data.user) {
            console.log(response.data);
            return response.data;
        }
    } catch (error: any) {
        return error.response.data;
    }
};

export default register;
