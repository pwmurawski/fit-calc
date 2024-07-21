import { useSWRConfig } from 'swr';
import { useLoading } from './useLoading';
import { deleteSelectedProduct } from '_api/selectedProducts';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getDayData } from '_api/dayData';
import { useSelectedDate } from './useSelectedDate';
import { clearCache } from 'helpers/clearCache';

export const useDeleteSelectedProduct = () => {
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();
    const { formatDate } = useSelectedDate();

    const deleteHandler = async (selectedId: string) => {
        setLoading(true);
        const res = await deleteSelectedProduct(selectedId);

        switch (res?.status) {
            case 'OK':
                await mutate(`/dayData/${formatDate}`, () => getDayData(formatDate));
                clearCache(cache, '/summary');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return deleteHandler;
};
