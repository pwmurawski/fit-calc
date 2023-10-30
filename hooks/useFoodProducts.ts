import useSWRImmutable from 'swr/immutable';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getFoodProducts } from '_api/foodProducts';

export const useFoodProducts = () => {
    const { data } = useSWRImmutable('/foodProducts', () => getFoodProducts());

    switch (data?.status) {
        case 'OK':
            return data.foodProducts;
        case 'ERROR':
            toastError(data.error);
            break;

        default:
            break;
    }
};
