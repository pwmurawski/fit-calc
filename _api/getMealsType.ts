import fitCalcApi from './fitCalcApi';

const getMealsType = async () => {
    const data = await fitCalcApi('/meals', {
        credentials: 'include',
    });

    return data;
};

export default getMealsType;
