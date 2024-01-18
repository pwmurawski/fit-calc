import { toastError } from 'lib/custom-toasts/toast-error';
import useSWRImmutable from 'swr/immutable';
import { getFoodProduct } from '_api/foodProducts';

export const useFoodProduct = (id: string) => {
    const { data } = useSWRImmutable(`/foodProduct/${id}`, () => getFoodProduct(id));

    switch (data?.status) {
        case 'OK':
            return data.foodProduct;
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
