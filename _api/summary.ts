import axios from 'axios';
import { Response } from 'types/Response';
import { SummaryResponse } from 'types/Summary';

export const getSummaryByDateRange = async (startDate: Date, endDate: Date): Response<SummaryResponse> => {
    try {
        const response = await axios.get<SummaryResponse>('/api/summary', {
            params: { startDate, endDate },
        });
        if (response.data.summaryData && response.data.dailyGoals) {
            return {
                summaryData: response.data.summaryData,
                dailyGoals: response.data.dailyGoals,
                daysData: response.data.daysData,
                status: 'OK',
            };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};
