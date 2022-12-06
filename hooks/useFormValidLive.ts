import { useState } from "react";
import { validate } from "../helpers/validations";
import { FormType } from "../types/FormTypes";

const useFormValidLive = <State>(
  initForm: FormType<State>
): [
  formData: FormType<State>,
  changeHandler: typeof changeHandler,
  setFormData: typeof setFormData
] => {
  const [formData, setFormData] = useState<FormType<State>>(initForm);

  const changeHandler = (value: string, fieldName: keyof State) => {
    const error = validate(formData[fieldName].rules, value);

    setFormData({
      ...formData,
      [fieldName]: {
        ...formData[fieldName],
        value,
        error,
      },
    });
  };

  return [formData, changeHandler, setFormData];
};

export default useFormValidLive;
