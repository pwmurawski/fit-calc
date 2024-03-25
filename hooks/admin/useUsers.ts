import { toastError } from 'lib/custom-toasts/toast-error';
import useSWRImmutable from 'swr/immutable';
import { getUsers } from '_api/users';

export const useUsers = () => {
    const { data } = useSWRImmutable(`/admin/users`, () => getUsers());
    switch (data?.status) {
        case 'OK':
            return data.users;
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
