import { useRouter } from 'next/router';
import { LoginData, RegisterData } from '../types/Auth';
import useLoading from './useLoading';
import { useSession, signIn, signOut } from 'next-auth/react';
import register from '../_api/auth/register';
import { toastError } from 'lib/custom-toasts/toast-error';

const useAuth = () => {
    const session = useSession();
    const { push } = useRouter();
    const { isLoading, setLoading } = useLoading();

    const loginHandler = async (formValue: LoginData) => {
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

    const registerHandler = async (formValue: RegisterData) => {
        setLoading(true);
        const { user, error } = await register(formValue);
        if (user) {
            return await loginHandler(formValue);
        }
        if (error) {
            setLoading(false);
            toastError(error);
        }
    };

    return { session, isLoading, loginHandler, logoutHandler, registerHandler };
};

export default useAuth;
