import { toastError } from 'lib/custom-toasts/toast-error';
import useSWRImmutable from 'swr/immutable';
import { getAllFoodProducts } from '_api/foodProducts';

export const useAllFoodProducts = (page?: number, pageSize?: number, blocked?: boolean) => {
    const pageKey = page ? `/${page}` : '';
    const pageSizeKey = pageSize ? `/${pageSize}` : '';
    const blockedKey = blocked ? '/blocked' : '';
    const { data } = useSWRImmutable(`/admin/foodProducts${pageKey}${pageSizeKey}${blockedKey}`, () =>
        getAllFoodProducts(page, pageSize, blocked),
    );
    switch (data?.status) {
        case 'OK':
            return data;
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
