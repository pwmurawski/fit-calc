import { loginValidationSchema } from 'lib/validation/loginValidationSchema';
import { AuthForm, InitFormValue } from '../../components/Forms/AuthForm/AuthForm';
import useAuth from '../../hooks/useAuth';

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

export default function Login() {
    const { loginHandler } = useAuth();

    return <AuthForm initFormValue={initFormValue} validationSchema={loginValidationSchema} onSubmit={loginHandler} />;
}
