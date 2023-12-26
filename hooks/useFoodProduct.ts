import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { useSelectedDate } from './useSelectedDate';
import { useLoading } from './useLoading';
import { useMealId } from './useMealId';
import { BodySelectedProduct, postSelectedProduct } from '_api/selectedProducts';
import { getDayData } from '_api/dayData';
import { toastError } from 'lib/custom-toasts/toast-error';
import useSWRImmutable from 'swr/immutable';
import { getFoodProduct } from '_api/foodProducts';
import { clearCache } from 'helpers/clearCache';

export const useFoodProduct = (id: string) => {
    const { data } = useSWRImmutable(`/foodProduct/${id}`, () => getFoodProduct(id));
    const { mutate, cache } = useSWRConfig();
    const { push } = useRouter();
    const { setLoading } = useLoading();
    const { mealId } = useMealId();
    const { formatDate } = useSelectedDate();

    const addFoodProductToMeal = async (foodProductId: string, weight: number) => {
        setLoading(true);
        if (mealId) {
            const data: BodySelectedProduct = {
                foodProductId,
                mealId,
                weight,
                dateTime: formatDate,
            };

            const res = await postSelectedProduct(data);
            switch (res?.status) {
                case 'OK':
                    mutate(`/dayData/${formatDate}`, () => getDayData(formatDate));
                    clearCache(cache, '/summary');
                    push('/foodProducts');
                    break;
                case 'ERROR':
                    toastError(res.error);
                    break;
            }
        } else {
            toastError('Brak wybranego posiłku');
            push('/');
        }
        setLoading(false);
    };

    switch (data?.status) {
        case 'OK':
            return { data: data.foodProduct, addFoodProductToMeal };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
