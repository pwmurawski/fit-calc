import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { useLoading } from './useLoading';
import { useSelectedDate } from './useSelectedDate';
import { getSelectedProduct, putSelectedProduct } from '_api/selectedProducts';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getDayData } from '_api/dayData';

export const useEditSelectedProduct = (id: string) => {
    const { data, mutate: mutateSelectedProducts } = useSWRImmutable(`/selectedProducts/${id}`, () =>
        getSelectedProduct(id),
    );
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();
    const { push } = useRouter();
    const { formatDate } = useSelectedDate();

    const editSelectedProduct = async (selectedProductId: string, weight: number) => {
        setLoading(true);
        const res = await putSelectedProduct(selectedProductId, { weight });
        switch (res?.status) {
            case 'OK':
                mutate(`/dayData/${formatDate}`, () => getDayData(formatDate));
                mutateSelectedProducts();
                push('/');
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
                data: data.selectedProduct,
                edit: editSelectedProduct,
            };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
