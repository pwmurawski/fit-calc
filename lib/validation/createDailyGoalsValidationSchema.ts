import { number, object } from 'yup';

export const createDailyGoalsValidationSchema = object({
    kcal: number().required('Pole wymagane!'),
    protein: number().required('Pole wymagane!'),
    fat: number().required('Pole wymagane!'),
    carbs: number().required('Pole wymagane!'),
});
