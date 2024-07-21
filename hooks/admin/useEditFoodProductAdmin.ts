import { getFoodProduct, putFoodProductAdmin } from '_api/foodProducts';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useSWRConfig } from 'swr';
import { BodyFoodProducts } from 'types/FoodProduct';
import useSWRImmutable from 'swr/immutable';
import { useLoading } from '../useLoading';
import { clearCache } from 'helpers/clearCache';

const useEditFoodProductAdmin = (id: string, isBlocked: boolean) => {
    const { data } = useSWRImmutable(`/admin/foodProduct/${id}`, () => getFoodProduct(id));
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();

    const editFoodProduct = async (data: BodyFoodProducts, currentPage?: number, rowsPerPage?: number) => {
        setLoading(true);
        const res = await putFoodProductAdmin(id, data);

        switch (res?.status) {
            case 'OK':
                const pageKey = currentPage ? `/${currentPage}` : '';
                const pageSizeKey = rowsPerPage ? `/${rowsPerPage}` : '';
                const blockedKey = isBlocked ? '/blocked' : '';
                clearCache(cache, '/admin/foodProducts');
                await mutate(`/admin/foodProducts${pageKey}${pageSizeKey}${blockedKey}`);
                await mutate(`/admin/foodProduct/${id}`, () => getFoodProduct(id));
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    switch (data?.status) {
        case 'OK':
            return {
                defaultValue: {
                    name: data.foodProduct?.name ?? '',
                    kcal: data.foodProduct?.kcal.toString() ?? '',
                    protein: data.foodProduct?.protein.toString() ?? '',
                    fat: data.foodProduct?.fat.toString() ?? '',
                    carbs: data.foodProduct?.carbs.toString() ?? '',
                    code: data.foodProduct?.code ?? '',
                },
                edit: editFoodProduct,
            };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};

export default useEditFoodProductAdmin;
