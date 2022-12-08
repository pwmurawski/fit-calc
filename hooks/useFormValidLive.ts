import { useState } from "react";
import { validate } from "../helpers/validations";
import { FormType } from "../types/FormTypes";

const useFormValidLive = <State>(initForm: FormType<State>) => {
  const [formValue, setFormData] = useState<FormType<State>>(initForm);

  const onChange = (value: string, fieldName: keyof State) => {
    const error = validate(formValue[fieldName].rules, value);

    setFormData({
      ...formValue,
      [fieldName]: {
        ...formValue[fieldName],
        value,
        error,
      },
    });
  };

  return { formValue, onChange, setFormData };
};

export default useFormValidLive;
