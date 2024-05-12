import { blockedFoodProducts } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';
import { BlockedFoodProductsBody } from 'types/blockedFoodProducts';
import { clearCache } from 'helpers/clearCache';

export const useBlockedFoodProducts = () => {
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();

    const blocked = async (data: BlockedFoodProductsBody, currentPage?: number, rowsPerPage?: number) => {
        setLoading(true);
        const res = await blockedFoodProducts(data);
        switch (res?.status) {
            case 'OK':
                const pageKey = currentPage ? `/${currentPage}` : '';
                const pageSizeKey = rowsPerPage ? `/${rowsPerPage}` : '';
                clearCache(cache, '/admin/foodProducts');
                await mutate(`/admin/foodProducts${pageKey}${pageSizeKey}`);
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return blocked;
};
