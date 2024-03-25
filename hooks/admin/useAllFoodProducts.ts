import { toastError } from 'lib/custom-toasts/toast-error';
import useSWRImmutable from 'swr/immutable';
import { getAllFoodProducts } from '_api/foodProducts';

export const useAllFoodProducts = (blocked?: boolean) => {
    const blockedKey = blocked ? '/blocked' : '';
    const { data } = useSWRImmutable(`/admin/foodProducts${blockedKey}`, () => getAllFoodProducts(blocked));
    switch (data?.status) {
        case 'OK':
            return data.foodProducts;
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
