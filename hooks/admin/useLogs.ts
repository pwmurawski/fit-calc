import { toastError } from 'lib/custom-toasts/toast-error';
import useSWRImmutable from 'swr/immutable';
import { getLogs } from '_api/logs';

export const useLogs = (page?: number, pageSize?: number) => {
    const pageKey = page ? `/${page}` : '';
    const pageSizeKey = pageSize ? `/${pageSize}` : '';
    const { data } = useSWRImmutable(`/admin/logs${pageKey}${pageSizeKey}`, () => getLogs(page, pageSize));
    switch (data?.status) {
        case 'OK':
            return data;
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
