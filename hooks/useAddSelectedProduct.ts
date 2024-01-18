import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { useSelectedDate } from './useSelectedDate';
import { useLoading } from './useLoading';
import { useMealId } from './useMealId';
import { BodySelectedProduct, postSelectedProduct } from '_api/selectedProducts';
import { getDayData } from '_api/dayData';
import { toastError } from 'lib/custom-toasts/toast-error';
import { clearCache } from 'helpers/clearCache';
import { addCurrentHour } from 'helpers/addCurrentHour';

export const useAddSelectedProduct = () => {
    const { mutate, cache } = useSWRConfig();
    const { push } = useRouter();
    const { setLoading } = useLoading();
    const { mealId } = useMealId();
    const { formatDate, date } = useSelectedDate();

    const addFoodProductToMeal = async (foodProductId: string, weight: number) => {
        setLoading(true);
        if (mealId) {
            const data: BodySelectedProduct = {
                foodProductId,
                mealId,
                weight,
                dateTime: addCurrentHour(date),
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

    return addFoodProductToMeal;
};
