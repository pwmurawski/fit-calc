import { useEffect, useState } from 'react';
import gramsToKcal from '../helpers/gramsToKcal';
import kcalToGrams from '../helpers/kcalToGrams';
import { toPercent } from '../helpers/toPercent';
import { useFormik } from 'formik';
import { BodyDailyGoals } from 'pages/api/dailyGoals';
import { createDailyGoalsValidationSchema } from 'lib/validation/dailyGoalsValidationSchema';

export type KeysPercentMacro = 'protein' | 'fat' | 'carbs';

const initPercentMacro = {
    protein: '',
    fat: '',
    carbs: '',
};

const useDailyGoalsForm = (initialValues: BodyDailyGoals, onSubmit: (data: BodyDailyGoals) => Promise<void>) => {
    const { values, setFieldValue, isValid, errors, submitForm } = useFormik({
        initialValues,
        validationSchema: createDailyGoalsValidationSchema,
        onSubmit,
        enableReinitialize: true,
    });
    const [percentMacro, setPercentMacro] = useState(initPercentMacro);
    const [totalPercent, setTotalPercent] = useState(0);
    const [isUpdating, setIsUpdating] = useState({
        values: true,
        percentMacro: false,
    });

    useEffect(() => {
        if (+values.kcal && isUpdating.values) {
            Object.keys(percentMacro).forEach((key) => {
                const keys = key as KeysPercentMacro;
                setPercentMacro((state) => ({
                    ...state,
                    [keys]: Math.round(toPercent(gramsToKcal(+values[keys], keys), +values.kcal)).toString(),
                }));
            });
        }
    }, [values]);

    useEffect(() => {
        if (+values.kcal && isUpdating.percentMacro) {
            Object.keys(percentMacro).forEach((key) => {
                const keys = key as KeysPercentMacro;
                setFieldValue(
                    keys,
                    Math.round(kcalToGrams((+values.kcal * +percentMacro[keys]) / 100, keys)).toString(),
                );
            });
        }
    }, [values.kcal, percentMacro]);

    useEffect(() => {
        setTotalPercent(Object.values(percentMacro).reduce((sum, curr) => sum + +curr, 0));
    }, [percentMacro]);

    return {
        values,
        setFieldValue,
        errors,
        submitForm,
        isValid,
        percentMacro,
        setPercentMacro,
        totalPercent,
        isUpdating,
        setIsUpdating,
    };
};

export default useDailyGoalsForm;
