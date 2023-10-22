import { BodyDailyGoalsType } from '../types/DailyGoalsTypes';
import fitCalcApi from './fitCalcApi';

const postDailyGoals = async (body: BodyDailyGoalsType) => {
    const data = await fitCalcApi('/dailyGoals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    return data;
};

export default postDailyGoals;
