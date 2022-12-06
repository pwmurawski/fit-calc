import { useEffect, useState } from "react";
import { IResponse } from "../types/IResponse";
import useFormValidLive from "./useFormValidLive";
import getBackendErrors from "../helpers/getBackendErrors";
import isErrorForm from "../helpers/isErrorForm";
import {
  FormType,
  FormDefaultValueType,
  SubmitType,
  FormRespValueType,
  BackendErrorsValuesType,
} from "../types/FormTypes";

const useForm = <InitFormValue>(
  initFormValue: FormType<InitFormValue>,
  defaultValue?: FormDefaultValueType<InitFormValue>
) => {
  const [formVal, onChange, setFormData] = useFormValidLive(initFormValue);
  const [backendErrors, setBackendErrors] =
    useState<Record<keyof InitFormValue, BackendErrorsValuesType>>();
  const [loading, setLoading] = useState(false);

  const setError = async <T, Y extends string>(
    response: IResponse<T, Y> | undefined
  ) => {
    const errors = response?.errors?.children;
    if (errors) {
      getBackendErrors(errors, setBackendErrors);
    }
  };

  const onSubmitHandler = async (submit: SubmitType<InitFormValue>) => {
    setLoading(true);
    const formResponseValue: object = {};

    Object.entries(formVal as FormType<InitFormValue>).forEach((entries) => {
      const [keys, values] = entries as [
        keyof InitFormValue,
        { value: string }
      ];
      Object.assign(formResponseValue, {
        [keys]: values?.value,
      });
    });

    if (formResponseValue) {
      const res = await submit(
        formResponseValue as FormRespValueType<InitFormValue>
      );
      setError(res);
      setLoading(false);
    }
  };

  useEffect(() => {
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
  }, [defaultValue]);

  return {
    formVal,
    onChange,
    onSubmitHandler,
    loading,
    backendErrors,
    isErrorForm,
  };
};

export default useForm;
