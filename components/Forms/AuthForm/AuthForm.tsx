import { Form, SubmitBtn } from './styles/styles';
import { Field, Formik } from 'formik';
import { InputCustom } from 'components/InputCustom/InputCustom';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { User } from '@prisma/client';

export type InitFormValue = Partial<
    Record<
        keyof Omit<User, 'id' | 'userType'>,
        {
            value: string;
            type?: string;
            placeholder: string;
        }
    >
>;

interface AuthFormProps {
    initFormValue: InitFormValue;
    onSubmit: (formValue: Partial<Record<keyof Omit<User, 'id' | 'userType'>, string>>) => void;
    submitBtnText?: string;
    validationSchema?: OptionalObjectSchema<ObjectShape>;
}

export function AuthForm({ initFormValue, validationSchema, onSubmit, submitBtnText = 'Zaloguj sie' }: AuthFormProps) {
    return (
        <Formik
            initialValues={Object.entries(initFormValue).reduce(
                (acc, [keys, values]) => ({ ...acc, [keys]: values.value }),
                {},
            )}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ submitForm, isValid }) => (
                <Form>
                    {Object.entries(initFormValue).map(([keys, values]) => (
                        <Field key={keys} component={InputCustom} name={keys} {...values} />
                    ))}
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
