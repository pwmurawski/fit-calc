import { Dispatch, SetStateAction } from "react";
import { ValuesResBackendErrorsType } from "../types/ResponseTypes";

const setErrors = <T>(
  errors: Record<string, ValuesResBackendErrorsType>,
  setBackendErrors: Dispatch<SetStateAction<T>>
) => {
  Object.entries(errors).forEach(([keys, values]) => {
    setBackendErrors((state) => ({
      ...state,
      [keys]: {
        error: values instanceof Array ? undefined : values.errors[0],
      },
    }));
  });
};

export default setErrors;
