import { postFoodProduct } from '_api/foodProducts';
import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { BodyFoodProducts } from 'types/FoodProduct';
import { useLoading } from '../useLoading';
import { clearCache } from 'helpers/clearCache';

export const useAddFoodProductAdmin = () => {
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();

    const addFoodProduct = async (data: BodyFoodProducts, currentPage?: number, rowsPerPage?: number) => {
        setLoading(true);
        const res = await postFoodProduct(data);
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

    return addFoodProduct;
};
