import { searchFoodProducts } from '_api/foodProducts';
import { useEffect, useState } from 'react';
import { FoodProductType } from 'types/FoodProduct';

export const useSearchFoodProducts = (term?: string) => {
    const [foodProducts, setFoodProducts] = useState<FoodProductType[]>();

    const getData = async (term?: string) => {
        const res = await searchFoodProducts(term);
        if (res?.status === 'OK') {
            setFoodProducts(res.foodProducts);
        }
    };

    useEffect(() => {
        getData(String(term));
    }, [term]);

    return foodProducts;
};
