import { loginValidationSchema } from 'lib/validation/loginValidationSchema';
import { AuthForm, InitFormValue } from '../../components/Forms/AuthForm/AuthForm';
import useAuth from '../../hooks/useAuth';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { RegisterLayout } from 'components/Layouts/RegisterLayout';

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
    return <RegisterLayout>{page}</RegisterLayout>;
};

export default Login;

export function LoginView() {
    const { loginHandler } = useAuth();

    return <AuthForm initFormValue={initFormValue} validationSchema={loginValidationSchema} onSubmit={loginHandler} />;
}
