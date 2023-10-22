import fitCalcApi from './fitCalcApi';

const getFoodProduct = async (id: string) => {
    const data = await fitCalcApi(`/foodProducts/${id}`);

    return data;
};

export default getFoodProduct;
