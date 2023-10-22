import fitCalcApi from './fitCalcApi';

const getDailyGoals = async (date: string) => {
    const data = await fitCalcApi(`/dailyGoals/${date}`, {
        credentials: 'include',
    });

    return data;
};

export default getDailyGoals;
