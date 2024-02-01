import axios from 'axios';
import { BodyDailyGoals, DailyGoalsResponse } from 'types/DailyGoals';
import { Response } from 'types/Response';

export const getDailyGoals = async (date: Date): Response<DailyGoalsResponse> => {
    try {
        const response = await axios.get<DailyGoalsResponse>('/api/dailyGoals', {
            params: { date },
        });
        if (response.data.dailyGoals) {
            return { dailyGoals: response.data.dailyGoals, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response.data.error, status: 'ERROR' };
    }
};

export const postDailyGoals = async (date: Date, body: BodyDailyGoals): Response<DailyGoalsResponse> => {
    try {
        const response = await axios.post<DailyGoalsResponse>('/api/dailyGoals', body, { params: { date } });
        if (response.data.dailyGoals) {
            return { dailyGoals: response.data.dailyGoals, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response.data.error, status: 'ERROR' };
    }
};
