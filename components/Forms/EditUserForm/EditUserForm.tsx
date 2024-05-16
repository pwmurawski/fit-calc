import { InputCustom } from '../../InputCustom/InputCustom';
import { AddBtn, Form } from './styles/styles';
import { Field, Formik } from 'formik';
import { User } from '@prisma/client';
import { editUserValidationSchema } from 'lib/validation/userValidationSchema';

type EditUserFormData = Pick<User, 'name' | 'surname' | 'email'>;

const initialValues: EditUserFormData = {
    name: '',
    surname: '',
    email: '',
};

interface IEditUserFormProps {
    submit: (data: EditUserFormData) => void;
    defaultValue?: EditUserFormData;
}

export function EditUserForm({ submit, defaultValue }: IEditUserFormProps) {
    const handleSubmit = (values: EditUserFormData) => {
        submit(values);
    };

    return (
        <Formik
            initialValues={defaultValue ?? initialValues}
            onSubmit={handleSubmit}
            validationSchema={editUserValidationSchema}
            enableReinitialize
        >
            {({ submitForm, isValid }) => (
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                >
                    <Field component={InputCustom} name="name" placeholder="Imię" type="text" />
                    <Field component={InputCustom} name="surname" placeholder="Nazwisko" type="text" />
                    <Field component={InputCustom} name="email" placeholder="Email" type="text" />
                    {!!isValid ? (
                        <AddBtn type="submit">Edytuj</AddBtn>
                    ) : (
                        <AddBtn type="button" isError>
                            Edytuj
                        </AddBtn>
                    )}
                </Form>
            )}
        </Formik>
    );
}
