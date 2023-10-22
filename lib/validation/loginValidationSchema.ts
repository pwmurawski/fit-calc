import { object, string } from 'yup';

export const loginValidationSchema = object({
    email: string().email('Nie prwaidłowy email!').required('Pole wymagane!'),
    password: string().required('Pole wymagane!'),
});
