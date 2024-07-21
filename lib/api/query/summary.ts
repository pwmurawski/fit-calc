import modifySummaryCalorieMacroData from 'helpers/modifySummaryCalorieMacroData';
import { getDailyGoalsByDateRange } from './dailyGoals';
import { getSelectedProductsByDateRange } from './selectedProducts';
import { eachDayOfInterval, format } from 'date-fns';
import { countDaysBetweenDates } from 'helpers/getSummaryDay';
import { getDayData } from './daysData';

export const getSummaryByDateRange = async (userId: string, startDate: string, endDate: string) => {
    const selectedProductDays = await getSelectedProductsByDateRange(userId, startDate, endDate);
    const goals = await getDailyGoalsByDateRange(userId, startDate, endDate);
    const summaryData = modifySummaryCalorieMacroData(selectedProductDays);

    const dailyGoals = goals.reduce(
        (acc, currentDate, index) => {
            const nextDate = goals[index + 1];

            let countDays = 1;
            if (nextDate) {
                const count = countDaysBetweenDates(
                    format(currentDate.dateTime, 'yyyy-MM-dd'),
                    format(nextDate.dateTime, 'yyyy-MM-dd'),
                );
                countDays = count;
            }

            return {
                kcal: acc.kcal + Number(currentDate.kcal) * countDays,
                protein: acc.protein + Number(currentDate.protein) * countDays,
                fat: acc.fat + Number(currentDate.fat) * countDays,
                carbs: acc.carbs + Number(currentDate.carbs) * countDays,
            };
        },
        { kcal: 0, protein: 0, fat: 0, carbs: 0 },
    );

    return {
        summaryData,
        dailyGoals,
    };
};

export const getSummaryDaysData = async (userId: string, startDate: string, endDate: string) => {
    const daysData = [];
    const datesArray = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
    for (const date of datesArray) {
        const dayData = await getDayData(userId, date.toISOString());
        daysData.push({ date: date.toISOString(), ...dayData });
    }

    return { daysData };
};
