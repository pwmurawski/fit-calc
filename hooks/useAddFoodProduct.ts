import { useRouter } from 'next/router';
import { getFoodProducts, postFoodProduct } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { BodyFoodProducts } from 'types/FoodProduct';

export const useAddFoodProduct = () => {
    const { push } = useRouter();
    const { mutate } = useSWRConfig();

    const addFoodProduct = async (data: BodyFoodProducts) => {
        const res = await postFoodProduct(data);
        switch (res?.status) {
            case 'OK':
                await mutate('/foodProducts', () => getFoodProducts());
                push('/foodProducts');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
    };

    return addFoodProduct;
};
