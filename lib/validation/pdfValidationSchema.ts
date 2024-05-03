import { boolean, date, object, string } from 'yup';

export const summaryPdfValidationSchema = object({
    id: string().required('Pole wymagane!'),
    action: string().required('Pole wymagane!'),
    data: object({
        date: object({
            start: string().required('Pole wymagane!'),
            end: string().required('Pole wymagane!'),
        }),
    }),
    generated: boolean(),
    expires: date().required('Pole wymagane!'),
});
