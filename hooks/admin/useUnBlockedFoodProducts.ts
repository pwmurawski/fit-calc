import { unBlockedFoodProducts } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';

export const useUnBlockedFoodProducts = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const unBlocked = async (foodProductId: string) => {
        setLoading(true);
        const res = await unBlockedFoodProducts(foodProductId);
        switch (res?.status) {
            case 'OK':
                await mutate(`/admin/foodProducts/blocked`);
                mutate(`/admin/foodProducts`, undefined);
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return unBlocked;
};
