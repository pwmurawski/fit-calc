import { useState } from "react";
import { ILoginFormValue } from "../interfaces/ILoginFormValue";
import { LoginFormType, SubmitType } from "../interfaces/LoginFormType";
import useForm from "./useForm";

const initFormValue: LoginFormType = {
  username: {
    value: "",
    rules: ["email", "required"],
  },
  password: {
    value: "",
    rules: [{ rule: "min", length: 4 }, "required"],
  },
};

const useLoginForm = () => {
  const { formVal, onChange, backendErrors, setError, isErrorForm } =
    useForm(initFormValue);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (onSubmit: SubmitType) => {
    setLoading(true);
    const formValue: ILoginFormValue = {
      username: formVal.username.value,
      password: formVal.password.value,
    };

    const res = await onSubmit(formValue);
    setError(res);
    setLoading(false);
  };

  return {
    formVal,
    onChange,
    onSubmitHandler,
    backendErrors,
    loading,
    isErrorForm,
  };
};

export default useLoginForm;
