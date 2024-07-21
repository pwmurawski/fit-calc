import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from '../useLoading';
import { deleteUserAdmin } from '_api/users';
import { clearCache } from 'helpers/clearCache';

export const useDeleteUserAdmin = () => {
    const { mutate, cache } = useSWRConfig();
    const { setLoading } = useLoading();

    const deleteUser = async (userId: string, currentPage?: number, rowsPerPage?: number) => {
        setLoading(true);
        const res = await deleteUserAdmin(userId);
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

    return deleteUser;
};
