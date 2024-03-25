import { getFoodProduct, putFoodProductAdmin } from '_api/foodProducts';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useSWRConfig } from 'swr';
import { BodyFoodProducts } from 'types/FoodProduct';
import useSWRImmutable from 'swr/immutable';
import { useLoading } from '../useLoading';

const useEditFoodProductAdmin = (id: string, isBlocked: boolean) => {
    const { data } = useSWRImmutable(`/admin/foodProduct/${id}`, () => getFoodProduct(id));
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const editFoodProduct = async (data: BodyFoodProducts) => {
        setLoading(true);
        const res = await putFoodProductAdmin(id, data);

        switch (res?.status) {
            case 'OK':
                if (!isBlocked) {
                    await mutate(`/admin/foodProducts`);
                } else {
                    await mutate(`/admin/foodProducts/blocked`);
                }
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
