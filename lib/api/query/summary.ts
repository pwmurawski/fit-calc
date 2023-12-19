import modifySummaryCalorieMacroData from 'helpers/modifySummaryCalorieMacroData';
import { getDailyGoals } from './dailyGoals';
import { getSelectedProductsDay, getSelectedProductsByDateRange } from './selectedProducts';

export const getSummaryDay = async (userId: string, date: string) => {
    const dailyGoals = await getDailyGoals(userId, date);
    const selectedProductDay = await getSelectedProductsDay(userId, date);
    const summaryData = modifySummaryCalorieMacroData(selectedProductDay);

    return { summaryData, dailyGoals };
};

export const getSummaryWeek = async (userId: string, date: string) => {
    const dailyGoals = await getDailyGoals(userId, date);
    const selectedProductDay = await getSelectedProductsByDateRange(userId, '2023-12-08', '2023-12-16');
    const summaryData = modifySummaryCalorieMacroData(selectedProductDay);

    return { summaryData, dailyGoals };
};

export const getSummaryMonth = async (userId: string, date: string) => {
    const dailyGoals = await getDailyGoals(userId, date);
    const selectedProductDay = await getSelectedProductsByDateRange(userId, '2023-12-01', '2023-12-31');
    const summaryData = modifySummaryCalorieMacroData(selectedProductDay);

    return { summaryData, dailyGoals };
};

export const getSummaryYear = async (userId: string, date: string) => {
    const dailyGoals = await getDailyGoals(userId, date);
    const selectedProductDay = await getSelectedProductsByDateRange(userId, '2023-01-01', '2023-12-31');
    const summaryData = modifySummaryCalorieMacroData(selectedProductDay);

    return { summaryData, dailyGoals };
};
