import { createUserValidationSchema } from 'lib/validation/createUserValidationSchema';
import { AuthForm } from '../../components/Forms/AuthForm/AuthForm';
import useAuth from '../../hooks/useAuth';

const initFormValue = {
    name: '',
    surname: '',
    email: '',
    password: '',
};

export default function Register() {
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
