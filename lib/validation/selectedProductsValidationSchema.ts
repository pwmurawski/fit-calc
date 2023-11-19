import { number, object, string } from 'yup';

export const createSelectedProductsValidationSchema = object({
    mealId: string().required('Pole wymagane!'),
    foodProductId: string().required('Pole wymagane!'),
    weight: number().required('Pole wymagane!'),
    dateTime: string().required('Pole wymagane!'),
});

export const updateSelectedProductsValidationSchema = object({
    weight: number().required('Pole wymagane!'),
});
