import fitCalcApi from './fitCalcApi';

const getFoodProducts = async () => {
    const data = await fitCalcApi('/foodProducts');

    return data;
};

export default getFoodProducts;
