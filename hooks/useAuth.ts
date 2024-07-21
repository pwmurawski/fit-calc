import { BodyLogin, BodyRegister } from '../types/Auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import { register } from '../_api/auth/register';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useLoading } from './useLoading';

export const useAuth = () => {
    const session = useSession();
    const { isLoading, setLoading } = useLoading();

    const loginHandler = async (formValue: Partial<BodyLogin>) => {
        setLoading(true);
        const res = await signIn('credentials', {
            ...formValue,
            log: navigator.userAgent,
            callbackUrl: '/app',
            redirect: false,
        });
        setLoading(false);
        if (!res?.ok && res?.error) {
            toastError(res.error);
        }
    };

    const logoutHandler = async () => {
        setLoading(true);
        await signOut({ callbackUrl: '/login' });
        setLoading(false);
    };

    const registerHandler = async (formValue: Partial<BodyRegister>) => {
        setLoading(true);
        const userData = await register(formValue);

        if (userData?.status === 'OK') {
            return await loginHandler(formValue);
        }
        if (userData?.status === 'ERROR') {
            toastError(userData.error);
        }
        setLoading(false);
    };

    return { session, isLoading, loginHandler, logoutHandler, registerHandler };
};
