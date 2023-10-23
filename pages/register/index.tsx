import { createUserValidationSchema } from 'lib/validation/createUserValidationSchema';
import { AuthForm, InitFormValue } from '../../components/Forms/AuthForm/AuthForm';
import useAuth from '../../hooks/useAuth';

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
