import { loginValidationSchema } from 'lib/validation/authValidationSchema';
import { AuthForm, InitFormValue } from '../../components/Forms/AuthForm/AuthForm';
import { useAuth } from '../../hooks/useAuth';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { RegisterLayout } from 'components/Layouts/RegisterLayout';
import { GoToRegister } from 'components/GoToRegister/GoToRegister';
import { UnSecured } from 'components/security/secured';

const initFormValue: InitFormValue = {
    email: {
        value: '',
        placeholder: 'Email',
    },
    password: {
        value: '',
        type: 'password',
        placeholder: 'Hasło',
    },
};

const Login: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Login</title>
            </Head>
            <LoginView />
        </>
    );
};

Login.getLayout = function getLayout(page) {
    return (
        <UnSecured>
            <RegisterLayout>{page}</RegisterLayout>
        </UnSecured>
    );
};

export default Login;

export function LoginView() {
    const { loginHandler } = useAuth();

    return (
        <>
            <AuthForm initFormValue={initFormValue} validationSchema={loginValidationSchema} onSubmit={loginHandler} />
            <GoToRegister />
        </>
    );
}
