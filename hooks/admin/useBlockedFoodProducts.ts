import { blockedFoodProducts, getAllFoodProducts } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';
import { BlockedFoodProductsBody } from 'types/blockedFoodProducts';

export const useBlockedFoodProducts = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const blocked = async (data: BlockedFoodProductsBody) => {
        setLoading(true);
        const res = await blockedFoodProducts(data);
        switch (res?.status) {
            case 'OK':
                await mutate(`/admin/foodProducts`);
                mutate(`/admin/foodProducts/blocked`, undefined);
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return blocked;
};
