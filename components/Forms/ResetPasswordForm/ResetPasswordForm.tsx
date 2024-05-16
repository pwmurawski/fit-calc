import { Container, Form, SubmitBtn, Title } from './styles/styles';
import { Field, Formik } from 'formik';
import { InputCustom } from 'components/InputCustom/InputCustom';
import { resetPasswordValidationSchema } from 'lib/validation/resetPasswordValidationSchema';

const initialValues = {
    newPassword: '',
    repeatPassword: '',
};

interface ResetPasswordFormProps {
    onSubmit: (formValue: typeof initialValues) => void;
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
    return (
        <Container>
            <Title>Reset hasła</Title>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={resetPasswordValidationSchema}>
                {({ submitForm, isValid }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitForm();
                        }}
                    >
                        <Field component={InputCustom} name="newPassword" placeholder="Nowe hasło" type="password" />
                        <Field
                            component={InputCustom}
                            name="repeatPassword"
                            placeholder="Powtórz hasło"
                            type="password"
                        />
                        {!!isValid ? (
                            <SubmitBtn type="submit">Resetuj hasło</SubmitBtn>
                        ) : (
                            <SubmitBtn type="button" isError>
                                Resetuj hasło
                            </SubmitBtn>
                        )}
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
