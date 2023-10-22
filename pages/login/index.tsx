import { loginValidationSchema } from 'lib/validation/loginValidationSchema';
import { AuthForm } from '../../components/Forms/AuthForm/AuthForm';
import useAuth from '../../hooks/useAuth';

const initFormValue = {
    email: '',
    password: '',
};

export default function Login() {
    const { loginHandler } = useAuth();

    return <AuthForm initFormValue={initFormValue} validationSchema={loginValidationSchema} onSubmit={loginHandler} />;
}
