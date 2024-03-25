import { deleteFoodProductAdmin } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';

export const useDeleteFoodProductAdmin = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const deleteFoodProduct = async (foodProductId: string) => {
        setLoading(true);
        const res = await deleteFoodProductAdmin(foodProductId);
        switch (res?.status) {
            case 'OK':
                await mutate('/admin/foodProducts/blocked');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return deleteFoodProduct;
};
