import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { UnSecured } from 'components/security/secured';
import { ResetPasswordForm } from 'components/Forms/ResetPasswordForm/ResetPasswordForm';
import { checkUserExistByCode } from 'lib/api/query/user';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { resetPassword } from '_api/users';
import { useRouter } from 'next/router';
import { toastError } from 'lib/custom-toasts/toast-error';
import { toastSucces } from 'lib/custom-toasts/toast-succes';
import { useLoading } from 'hooks/useLoading';

interface Params extends ParsedUrlQuery {
    code: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext<Params>) {
    const { params } = context;

    if (!(await checkUserExistByCode(String(params?.code)))) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { code: params?.code },
    };
}

interface ResetPasswordProps {
    code: string;
}

const ResetPassword: NextPageWithLayout<ResetPasswordProps> = ({ code }) => {
    return (
        <>
            <Head>
                <title>FitCalc | Reset Password</title>
            </Head>
            <ResetPasswordView code={code} />
        </>
    );
};

ResetPassword.getLayout = function getLayout(page) {
    return <UnSecured>{page}</UnSecured>;
};

export default ResetPassword;

export function ResetPasswordView({ code }: ResetPasswordProps) {
    const { push } = useRouter();
    const { setLoading } = useLoading();

    const handleResetPassword = async (data: { newPassword: string; repeatPassword: string }) => {
        setLoading(true);
        const res = await resetPassword(code, data.newPassword);

        if (res?.status === 'OK') {
            toastSucces(res.message);
            push('/login');
        }
        if (res?.status === 'ERROR') {
            toastError(res.error);
        }
        setLoading(false);
    };

    return <ResetPasswordForm onSubmit={handleResetPassword} />;
}
