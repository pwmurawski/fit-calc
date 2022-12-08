import { useEffect, useState } from "react";
import useFormValidLive from "./useFormValidLive";
import setErrors from "../helpers/setErrors";
import isErrorForm from "../helpers/isErrorForm";
import {
  FormType,
  FormDefaultValueType,
  SubmitType,
  FormRespValueType,
  BackendErrorsType,
  ValuesType,
} from "../types/FormTypes";

const useForm = <InitFormValue>(
  initFormValue: FormType<InitFormValue>,
  defaultValue?: FormDefaultValueType<InitFormValue>
) => {
  const { formValue, onChange, setFormData } = useFormValidLive(initFormValue);
  const [backendErrors, setBackendErrors] =
    useState<BackendErrorsType<InitFormValue>>();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (submit: SubmitType<InitFormValue>) => {
    setLoading(true);
    const formResponseValue = Object.entries(
      formValue as Record<string, ValuesType>
    ).reduce(
      (acc, [key, { value }]) => ({
        ...acc,
        [key]: value,
      }),
      {} as FormRespValueType<InitFormValue>
    );

    const errors = await submit(formResponseValue);

    if (errors) {
      setErrors(errors, setBackendErrors);
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
    onChange,
    onSubmitHandler,
    loading,
    backendErrors,
    isErrorForm,
  };
};

export default useForm;
