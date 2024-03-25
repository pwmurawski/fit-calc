import { unVerifiedFoodProducts } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';

export const useUnVerifiedFoodProducts = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const unVerified = async (foodProductId: string, isBlocked: boolean) => {
        setLoading(true);
        const res = await unVerifiedFoodProducts(foodProductId);
        switch (res?.status) {
            case 'OK':
                if (!isBlocked) {
                    await mutate(`/admin/foodProducts`);
                } else {
                    await mutate(`/admin/foodProducts/blocked`);
                }
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return unVerified;
};
