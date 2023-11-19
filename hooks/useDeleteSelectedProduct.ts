import { useSWRConfig } from 'swr';
import { useLoading } from './useLoading';
import { deleteSelectedProduct } from '_api/selectedProducts';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getDayData } from '_api/dayData';
import { useSelectedDate } from './useSelectedDate';

export const useDeleteSelectedProduct = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();
    const { formatDate } = useSelectedDate();

    const deleteHandler = async (selectedId: string) => {
        setLoading(true);
        const res = await deleteSelectedProduct(selectedId);

        switch (res?.status) {
            case 'OK':
                await mutate(`/dayData/${formatDate}`, () => getDayData(formatDate));
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return deleteHandler;
};
