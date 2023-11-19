import axios from 'axios';
import { DayDataResponse } from 'types/DayData';
import { Response } from 'types/Response';

export const getDayData = async (date: string): Response<DayDataResponse> => {
    try {
        const response = await axios.get<DayDataResponse>('/api/dayData', {
            params: {
                date,
            },
        });

        if (response.data.mealsData && response.data.summaryData) {
            return { mealsData: response.data.mealsData, summaryData: response.data.summaryData, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response.data.error, status: 'ERROR' };
    }
};
