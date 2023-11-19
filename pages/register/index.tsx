import { createUserValidationSchema } from 'lib/validation/userValidationSchema';
import { AuthForm, InitFormValue } from '../../components/Forms/AuthForm/AuthForm';
import { useAuth } from '../../hooks/useAuth';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { RegisterLayout } from 'components/Layouts/RegisterLayout';

const initFormValue: InitFormValue = {
    name: {
        value: '',
        placeholder: 'Imie',
    },
    surname: {
        value: '',
        placeholder: 'Nazwisko',
    },
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

const Register: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Register</title>
            </Head>
            <RegisterView />
        </>
    );
};

Register.getLayout = function getLayout(page) {
    return <RegisterLayout>{page}</RegisterLayout>;
};

export default Register;

export function RegisterView() {
    const { registerHandler } = useAuth();

    return (
        <AuthForm
            initFormValue={initFormValue}
            validationSchema={createUserValidationSchema}
            onSubmit={registerHandler}
            submitBtnText="Zarejestruj się"
        />
    );
}
