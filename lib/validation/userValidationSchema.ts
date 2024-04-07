import { object, string } from 'yup';

export const createUserValidationSchema = object({
    name: string().required('Pole wymagane!'),
    surname: string(),
    email: string().email('Nie prwaidłowy email!').required('Pole wymagane!'),
    password: string().required('Pole wymagane!'),
});

export const editUserValidationSchema = object({
    name: string().required('Pole wymagane!'),
    surname: string(),
    email: string().email('Nie prwaidłowy email!').required('Pole wymagane!'),
});

export const changePasswordUserValidationSchema = object({
    oldPassword: string().required('Pole wymagane!'),
    password: string().required('Pole wymagane!'),
});
