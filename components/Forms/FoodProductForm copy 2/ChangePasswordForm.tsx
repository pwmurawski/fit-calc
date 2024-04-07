import { InputCustom } from '../../InputCustom/InputCustom';
import { AddBtn, Form } from './styles/styles';
import { Field, Formik } from 'formik';
import { changePasswordUserValidationSchema } from 'lib/validation/userValidationSchema';

type ChangePasswordFormData = {
    oldPassword: string;
    password: string;
};

const initialValues: ChangePasswordFormData = {
    oldPassword: '',
    password: '',
};

interface IChangePasswordFormProps {
    submit: (data: ChangePasswordFormData) => void;
    defaultValue?: ChangePasswordFormData;
}

export function ChangePasswordForm({ submit, defaultValue }: IChangePasswordFormProps) {
    const handleSubmit = (values: ChangePasswordFormData) => {
        submit(values);
    };

    return (
        <Formik
            initialValues={defaultValue ?? initialValues}
            onSubmit={handleSubmit}
            validationSchema={changePasswordUserValidationSchema}
            enableReinitialize
        >
            {({ submitForm, isValid }) => (
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                >
                    <Field component={InputCustom} name="oldPassword" placeholder="Stare hasło" type="password" />
                    <Field component={InputCustom} name="password" placeholder="Nowe hasło" type="password" />
                    {!!isValid ? (
                        <AddBtn type="submit">Zmień hasło</AddBtn>
                    ) : (
                        <AddBtn type="button" isError>
                            Zmień hasło
                        </AddBtn>
                    )}
                </Form>
            )}
        </Formik>
    );
}
