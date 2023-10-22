import { IFoodProductFormValue } from '../types/FoodProductFormTypes';
import fitCalcApi from './fitCalcApi';

const postFoodProduct = async (body?: IFoodProductFormValue) => {
    const data = await fitCalcApi('/foodProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    return data;
};

export default postFoodProduct;
