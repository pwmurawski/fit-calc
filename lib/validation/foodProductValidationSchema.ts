import { number, object, string } from 'yup';

export const createFoodProductValidationSchema = object({
    name: string().required('Pole wymagane!'),
    kcal: number().required('Pole wymagane!'),
    protein: number().required('Pole wymagane!'),
    fat: number().required('Pole wymagane!'),
    carbs: number().required('Pole wymagane!'),
    code: string(),
});
