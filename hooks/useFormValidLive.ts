/* eslint-disable no-unused-vars */
import { useState } from "react";
import { validate } from "../helpers/validations";

const useFormValidLive = <State>(
  initForm: State
): [
  formData: State,
  changeHandler: typeof changeHandler,
  setFormData: typeof setFormData
] => {
  const [formData, setFormData] = useState<any>(initForm);

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
