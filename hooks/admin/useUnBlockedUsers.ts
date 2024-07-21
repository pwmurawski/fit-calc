import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';
import { clearCache } from 'helpers/clearCache';
import { unBlockedUsers } from '_api/users';

export const useUnBlockedUsers = () => {
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();

    const unBlocked = async (userId: string, currentPage?: number, rowsPerPage?: number) => {
        setLoading(true);
        const res = await unBlockedUsers(userId);
        switch (res?.status) {
            case 'OK':
                const pageKey = currentPage ? `/${currentPage}` : '';
                const pageSizeKey = rowsPerPage ? `/${rowsPerPage}` : '';
                clearCache(cache, '/admin/users');
                await mutate(`/admin/users${pageKey}${pageSizeKey}/blocked`);
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return unBlocked;
};
