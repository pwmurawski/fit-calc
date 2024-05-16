import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { UnSecured } from 'components/security/secured';
import { SendEmailResetPasswordForm } from 'components/Forms/SendEmailResetPasswordForm/SendEmailResetPasswordForm';
import { sendEmailResetPassword } from '_api/users';
import { toastSucces } from 'lib/custom-toasts/toast-succes';
import { toastError } from 'lib/custom-toasts/toast-error';
import { useRouter } from 'next/router';
import { useLoading } from 'hooks/useLoading';

const SendEmailResetPassword: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Reset Password</title>
            </Head>
            <SendEmailResetPasswordView />
        </>
    );
};

SendEmailResetPassword.getLayout = function getLayout(page) {
    return <UnSecured>{page}</UnSecured>;
};

export default SendEmailResetPassword;

export function SendEmailResetPasswordView() {
    const { push } = useRouter();
    const { setLoading } = useLoading();

    const handleSendEmailResetPassword = async (data: { email: string }) => {
        setLoading(true);
        const res = await sendEmailResetPassword(data.email);

        if (res?.status === 'OK') {
            toastSucces(res.message);
            push('/login');
        }
        if (res?.status === 'ERROR') {
            toastError(res.error);
        }
        setLoading(false);
    };

    return <SendEmailResetPasswordForm onSubmit={handleSendEmailResetPassword} />;
}
