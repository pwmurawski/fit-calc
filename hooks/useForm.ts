import { useState } from "react";
import { IResponse } from "../interfaces/IResponse";
import { BackendErrorsValuesType } from "../interfaces/LoginFormType";
import useFormValidLive from "./useFormValidLive";
import getBackendErrors from "../helpers/getBackendErrors";
import isErrorForm from "../helpers/isErrorForm";

const useForm = <InitFormValue>(initFormValue: InitFormValue) => {
  const [formVal, onChange] = useFormValidLive(initFormValue);
  const [backendErrors, setBackendErrors] =
    useState<Record<keyof InitFormValue, BackendErrorsValuesType>>();

  const setError = async <T, Y extends string>(
    response: IResponse<T, Y> | undefined
  ) => {
    const errors = response?.errors?.children;
    if (errors) {
      getBackendErrors(errors, setBackendErrors);
    }
  };

  return { formVal, onChange, backendErrors, setError, isErrorForm };
};

export default useForm;
