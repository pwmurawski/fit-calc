import { useSWRConfig } from 'swr';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from './useLoading';
import { changePasswordUser, updateUser } from '_api/users';
import { BodyUpdateUser } from 'pages/api/users';
import { toastSucces } from 'lib/custom-toasts/toast-succes';
import { BodyChangePasswordUser } from 'pages/api/users/change-password';

export const useUpdateUser = () => {
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const update = async (data: BodyUpdateUser) => {
        setLoading(true);
        const res = await updateUser(data);
        switch (res?.status) {
            case 'OK':
                await mutate('/api/users');
                toastSucces('Użytkownik został zaktualizowany!');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    const changePassword = async (data: BodyChangePasswordUser) => {
        setLoading(true);
        const res = await changePasswordUser(data);
        switch (res?.status) {
            case 'OK':
                toastSucces('Hasło zostało zmienione!');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return { update, changePassword };
};
