import { postFoodProduct } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { BodyFoodProducts } from 'types/FoodProduct';
import { useLoading } from '../useLoading';

export const useAddFoodProductAdmin = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const addFoodProduct = async (data: BodyFoodProducts) => {
        setLoading(true);
        const res = await postFoodProduct(data);
        switch (res?.status) {
            case 'OK':
                await mutate('/admin/foodProducts');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return addFoodProduct;
};
