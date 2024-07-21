import axios from 'axios';
import { LogsAdminTableResponse } from 'types/Logs';

import { Response } from 'types/Response';

export const getLogs = async (page?: number, pageSize?: number): Response<LogsAdminTableResponse> => {
    try {
        const response = await axios.get<LogsAdminTableResponse>('/api/admin/logs', {
            params: { page, pageSize },
        });
        if (response.data.logs) {
            return { ...response.data, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};
