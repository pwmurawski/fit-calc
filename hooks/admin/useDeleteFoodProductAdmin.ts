import { deleteFoodProductAdmin } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';
import { clearCache } from 'helpers/clearCache';

export const useDeleteFoodProductAdmin = () => {
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();

    const deleteFoodProduct = async (foodProductId: string, currentPage?: number, rowsPerPage?: number) => {
        setLoading(true);
        const res = await deleteFoodProductAdmin(foodProductId);
        switch (res?.status) {
            case 'OK':
                const pageKey = currentPage ? `/${currentPage}` : '';
                const pageSizeKey = rowsPerPage ? `/${rowsPerPage}` : '';
                clearCache(cache, '/admin/foodProducts');
                await mutate(`/admin/foodProducts${pageKey}${pageSizeKey}/blocked`);
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return deleteFoodProduct;
};
