import { verifiedFoodProducts } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';
import { VerifiedFoodProductsBody } from 'types/verifiedFoodProducts';

export const useVerifiedFoodProducts = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const verified = async (
        data: VerifiedFoodProductsBody,
        currentPage?: number,
        rowsPerPage?: number,
        isBlocked?: boolean,
    ) => {
        setLoading(true);
        const res = await verifiedFoodProducts(data);
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

    return verified;
};
