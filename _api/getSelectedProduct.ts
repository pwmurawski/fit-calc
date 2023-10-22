import fitCalcApi from './fitCalcApi';

const getSelectedProduct = async (id: string) => {
    const data = await fitCalcApi(`/selectedProduct/${id}`, {
        credentials: 'include',
    });

    return data;
};

export default getSelectedProduct;
