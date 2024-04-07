import { array, boolean, number, object, string } from 'yup';

const transformNumber = (value: string, originalValue: string) => {
    if (!originalValue) {
        return undefined;
    }
    return Number(originalValue.replace(',', '.'));
};

const validateNumber = number().transform(transformNumber).typeError('musi być liczba!').required('jest wymagana!');
const validateBoolean = boolean().typeError('musi być wartością "True" lub "False"!');

export const importValidationSchema = array(
    object({
        id: string(),
        name: string().required('jest wymagana!'),
        kcal: validateNumber,
        protein: validateNumber,
        fat: validateNumber,
        carbs: validateNumber,
        code: string(),
        verifiedFoodProduct: validateBoolean,
        blockedFoodProduct: validateBoolean,
        user: string(),
        action: string(),
    }),
);
