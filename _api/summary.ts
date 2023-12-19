import axios from 'axios';
import { Response } from 'types/Response';
import { SummaryResponse } from 'types/Summary';

export const getSummaryDay = async (date: string): Response<SummaryResponse> => {
    try {
        const response = await axios.get<SummaryResponse>('/api/summary/day', { params: { date } });
        if (response.data.summaryData && response.data.dailyGoals) {
            return { summaryData: response.data.summaryData, dailyGoals: response.data.dailyGoals, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const getSummaryWeek = async (date: string): Response<SummaryResponse> => {
    try {
        const response = await axios.get<SummaryResponse>('/api/summary/week', { params: { date } });
        if (response.data.summaryData && response.data.dailyGoals) {
            return { summaryData: response.data.summaryData, dailyGoals: response.data.dailyGoals, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const getSummaryMonth = async (date: string): Response<SummaryResponse> => {
    try {
        const response = await axios.get<SummaryResponse>('/api/summary/month', { params: { date } });
        if (response.data.summaryData && response.data.dailyGoals) {
            return { summaryData: response.data.summaryData, dailyGoals: response.data.dailyGoals, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};

export const getSummaryYear = async (date: string): Response<SummaryResponse> => {
    try {
        const response = await axios.get<SummaryResponse>('/api/summary/year', { params: { date } });
        if (response.data.summaryData && response.data.dailyGoals) {
            return { summaryData: response.data.summaryData, dailyGoals: response.data.dailyGoals, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response?.data.error, status: 'ERROR' };
    }
};
