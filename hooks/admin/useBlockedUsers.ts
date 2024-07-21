import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';
import { clearCache } from 'helpers/clearCache';
import { blockedUsers } from '_api/users';
import { BlockedUsersBody } from 'types/blockedUsers';

export const useBlockedUsers = () => {
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();

    const blocked = async (data: BlockedUsersBody, currentPage?: number, rowsPerPage?: number) => {
        setLoading(true);
        const res = await blockedUsers(data);
        switch (res?.status) {
            case 'OK':
                const pageKey = currentPage ? `/${currentPage}` : '';
                const pageSizeKey = rowsPerPage ? `/${rowsPerPage}` : '';
                clearCache(cache, '/admin/users');
                await mutate(`/admin/users${pageKey}${pageSizeKey}`);
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return blocked;
};
