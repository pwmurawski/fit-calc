import { object, ref, string } from 'yup';

export const resetPasswordValidationSchema = object().shape({
    newPassword: string().required('Pole hasła jest wymagane'),
    repeatPassword: string()
        .oneOf([ref('newPassword'), null], 'Hasła muszą być takie same')
        .required('Potwierdzenie hasła jest wymagane'),
});

export const sendEmailResetPasswordValidationSchema = object().shape({
    email: string().email('Nie prwaidłowy email!').required('Pole wymagane!'),
});
