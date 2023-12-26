import { useRouter } from 'next/router';
import { getFoodProduct, getFoodProducts, putFoodProduct } from '_api/foodProducts';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useSWRConfig } from 'swr';
import { BodyFoodProducts } from 'types/FoodProduct';
import useSWRImmutable from 'swr/immutable';
import { useLoading } from './useLoading';
import { clearCache } from 'helpers/clearCache';

const useEditFoodProduct = (id: string) => {
    const { data, mutate: mutateFoodProduct } = useSWRImmutable(`/foodProduct/${id}`, () => getFoodProduct(id));
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();
    const { back } = useRouter();

    const editFoodProduct = async (data: BodyFoodProducts) => {
        setLoading(true);
        const res = await putFoodProduct(id, data);

        switch (res?.status) {
            case 'OK':
                await mutateFoodProduct();
                mutate('/foodProducts', () => getFoodProducts());
                clearCache(cache, '/selectedProducts');
                clearCache(cache, '/dayData');
                back();
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
                    code: data.foodProduct?.code ?? undefined,
                },
                edit: editFoodProduct,
            };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};

export default useEditFoodProduct;
