import { unVerifiedFoodProducts } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';

export const useUnVerifiedFoodProducts = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const unVerified = async (
        foodProductId: string,
        currentPage?: number,
        rowsPerPage?: number,
        isBlocked?: boolean,
    ) => {
        setLoading(true);
        const res = await unVerifiedFoodProducts(foodProductId);
        switch (res?.status) {
            case 'OK':
                const pageKey = currentPage ? `/${currentPage}` : '';
                const pageSizeKey = rowsPerPage ? `/${rowsPerPage}` : '';
                const blockedKey = isBlocked ? '/blocked' : '';
                await mutate(`/admin/foodProducts${pageKey}${pageSizeKey}${blockedKey}`);
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return unVerified;
};
