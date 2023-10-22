import { Form, SubmitBtn } from './styles/styles';
import { Field, Formik } from 'formik';
import { User } from '@prisma/client';
import { isString } from 'lodash';
import { InputCustom } from 'components/InputCustom/InputCustom';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

interface IAuthFormProps<T> {
    initFormValue: T;
    onSubmit: (formValue: T) => void;
    submitBtnText?: string;
    validationSchema?: OptionalObjectSchema<ObjectShape>;
}

export function AuthForm<T extends Partial<Omit<User, 'id' | 'userType'>>>({
    initFormValue,
    validationSchema,
    onSubmit,
    submitBtnText = 'Zaloguj sie',
}: IAuthFormProps<T>) {
    return (
        <Formik initialValues={initFormValue} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ submitForm, isValid }) => (
                <Form>
                    {isString(initFormValue.name) && <Field component={InputCustom} name="name" placeholder="Imie" />}
                    {isString(initFormValue.surname) && (
                        <Field component={InputCustom} name="surname" placeholder="Nazwisko" />
                    )}
                    <Field component={InputCustom} name="email" placeholder="Email" />
                    <Field component={InputCustom} type="password" name="password" placeholder="Hasło" />
                    {!!isValid ? (
                        <SubmitBtn
                            onClick={(e) => {
                                e.preventDefault();
                                submitForm();
                            }}
                        >
                            {submitBtnText}
                        </SubmitBtn>
                    ) : (
                        <SubmitBtn isError type="button">
                            {submitBtnText}
                        </SubmitBtn>
                    )}
                </Form>
            )}
        </Formik>
    );
}
