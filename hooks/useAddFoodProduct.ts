import { useRouter } from 'next/router';
import { getFoodProducts, postFoodProduct } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { BodyFoodProducts } from 'types/FoodProduct';
import { useLoading } from './useLoading';

export const useAddFoodProduct = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();
    const { push } = useRouter();

    const addFoodProduct = async (data: BodyFoodProducts) => {
        setLoading(true);
        const res = await postFoodProduct(data);
        switch (res?.status) {
            case 'OK':
                // await mutate('/foodProducts', () => getFoodProducts());
                push('/foodProducts');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return addFoodProduct;
};
