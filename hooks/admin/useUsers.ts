import { toastError } from 'lib/custom-toasts/toast-error';
import useSWRImmutable from 'swr/immutable';
import { getAllUsers } from '_api/users';

export const useUsers = (page?: number, pageSize?: number, blocked?: boolean) => {
    const pageKey = page ? `/${page}` : '';
    const pageSizeKey = pageSize ? `/${pageSize}` : '';
    const blockedKey = blocked ? '/blocked' : '';
    const { data } = useSWRImmutable(`/admin/users${pageKey}${pageSizeKey}${blockedKey}`, () =>
        getAllUsers(page, pageSize, blocked),
    );
    switch (data?.status) {
        case 'OK':
            return data;
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
