import fitCalcApi from './fitCalcApi';

const deleteFoodProduct = async (id: string) => {
    const data = await fitCalcApi(`/foodProduct/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    return data;
};

export default deleteFoodProduct;
