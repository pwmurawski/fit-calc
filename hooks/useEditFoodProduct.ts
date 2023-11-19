import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import revalidate from '../helpers/revalidate';
import { getFoodProduct, getFoodProducts, putFoodProduct } from '_api/foodProducts';
import { toastError } from 'lib/custom-toasts/toast-error';
import { BodyFoodProducts } from 'pages/api/foodProducts';
import { useSWRConfig } from 'swr';

const useEditFoodProduct = (id: string) => {
    const { back, prefetch } = useRouter();
    const { mutate } = useSWRConfig();
    const [defaultValue, setDefaultValue] = useState<BodyFoodProducts>();

    const getData = async () => {
        const res = await getFoodProduct(id);
        switch (res?.status) {
            case 'OK':
                setDefaultValue({
                    name: res.foodProduct?.name ?? '',
                    kcal: res.foodProduct?.kcal.toString() ?? '',
                    protein: res.foodProduct?.protein.toString() ?? '',
                    fat: res.foodProduct?.fat.toString() ?? '',
                    carbs: res.foodProduct?.carbs.toString() ?? '',
                    code: res.foodProduct?.code ?? undefined,
                });
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
    };

    const editFoodProduct = async (data: BodyFoodProducts) => {
        const res = await putFoodProduct(id, data);

        switch (res?.status) {
            case 'OK':
                await revalidate(`/foodProducts/${id}`);
                await prefetch(`/foodProducts/${id}`, undefined, { priority: true });
                mutate('/foodProducts', () => getFoodProducts());
                back();
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        defaultValue,
        editFoodProduct,
    };
};

export default useEditFoodProduct;
