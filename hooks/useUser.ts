import useSWRImmutable from 'swr/immutable';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getUser } from '_api/users';

export const useUser = () => {
    const { data } = useSWRImmutable(`/api/users`, () => getUser());

    switch (data?.status) {
        case 'OK':
            return {
                user: data.user,
            };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
