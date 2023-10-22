import { IBodySelectedProduct } from '../types/SelectedProductTypes';
import fitCalcApi from './fitCalcApi';

const postSelectedProduct = async (body: IBodySelectedProduct) => {
    const data = await fitCalcApi('/selectedProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    return data;
};

export default postSelectedProduct;
