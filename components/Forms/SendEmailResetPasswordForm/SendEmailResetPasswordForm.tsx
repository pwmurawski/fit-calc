import { Container, Form, SubmitBtn, Title } from './styles/styles';
import { Field, Formik } from 'formik';
import { InputCustom } from 'components/InputCustom/InputCustom';
import { sendEmailResetPasswordValidationSchema } from 'lib/validation/resetPasswordValidationSchema';

const initialValues = {
    email: '',
};

interface SendEmailResetPasswordFormProps {
    onSubmit: (formValue: typeof initialValues) => void;
}

export function SendEmailResetPasswordForm({ onSubmit }: SendEmailResetPasswordFormProps) {
    return (
        <Container>
            <Title>Reset hasła</Title>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={sendEmailResetPasswordValidationSchema}
            >
                {({ submitForm, isValid }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitForm();
                        }}
                    >
                        <Field component={InputCustom} name="email" placeholder="Podaj email" type="text" />
                        {!!isValid ? (
                            <SubmitBtn type="submit">Wyślij email</SubmitBtn>
                        ) : (
                            <SubmitBtn type="button" isError>
                                Wyślij email
                            </SubmitBtn>
                        )}
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
