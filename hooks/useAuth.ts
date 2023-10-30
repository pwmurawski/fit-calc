import { useRouter } from 'next/router';
import { LoginData, RegisterData } from '../types/Auth';
import useLoading from './useLoading';
import { useSession, signIn, signOut } from 'next-auth/react';
import { register } from '../_api/auth/register';
import { toastError } from 'lib/custom-toasts/toast-error';

const useAuth = () => {
    const session = useSession();
    const { push } = useRouter();
    const { isLoading, setLoading } = useLoading();

    const loginHandler = async (formValue: Partial<LoginData>) => {
        setLoading(true);
        const res = await signIn('credentials', {
            ...formValue,
            redirect: false,
        });
        setLoading(false);
        if (res?.ok) {
            push('/');
        }
        if (!res?.ok && res?.error) {
            toastError(res.error);
        }
    };

    const logoutHandler = async () => {
        setLoading(true);
        await signOut({ callbackUrl: '/login' });
        setLoading(false);
    };

    const registerHandler = async (formValue: Partial<RegisterData>) => {
        setLoading(true);
        const userData = await register(formValue);

        if (userData?.status === 'OK') {
            return await loginHandler(formValue);
        }
        if (userData?.status === 'ERROR') {
            setLoading(false);
            toastError(userData.error);
        }
    };

    return { session, isLoading, loginHandler, logoutHandler, registerHandler };
};

export default useAuth;
