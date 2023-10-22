import { useEffect } from 'react';
import useFormValidLive from './useFormValidLive';
import isErrorForm from '../helpers/isErrorForm';
import { FormType, FormDefaultValueType, SubmitType, FormRespValueType, ValuesType } from '../types/FormTypes';
import useLoading from './useLoading';
import { toastError } from 'lib/custom-toasts/toast-error';

const useForm = <InitFormValue>(
    initFormValue: FormType<InitFormValue>,
    defaultValue?: FormDefaultValueType<InitFormValue>,
) => {
    const { formValue, onChange, setFormData } = useFormValidLive(initFormValue);
    const { setLoading } = useLoading();

    const onSubmitHandler = async (submit: SubmitType<InitFormValue>) => {
        setLoading(true);
        const formResponseValue = Object.entries(formValue as Record<string, ValuesType>).reduce(
            (acc, [key, { value }]) => ({
                ...acc,
                [key]: value,
            }),
            {} as FormRespValueType<InitFormValue>,
        );

        const isError = await submit(formResponseValue);

        if (!isError) {
            setFormData(initFormValue);
        }
        setLoading(false);
    };

    const onDefaultValue = () => {
        if (defaultValue) {
            Object.entries(defaultValue).forEach((entries) => {
                const [keys, values] = entries as [keyof InitFormValue, string];
                setFormData((state) => ({
                    ...state,
                    [keys]: {
                        ...state[keys],
                        value: values ?? state[keys].value,
                    },
                }));
            });
        }
    };

    useEffect(() => {
        onDefaultValue();
    }, [defaultValue]);

    return {
        formValue,
        setFormData,
        onChange,
        onSubmitHandler,
        isErrorForm,
    };
};

export default useForm;
