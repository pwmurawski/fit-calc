import { Dispatch, SetStateAction } from "react";
import { ValuesResBackendErrorsType } from "../types/IResponse";

const getBackendErrors = <T>(
  errors: Record<string, ValuesResBackendErrorsType>,
  setBackendErrors: Dispatch<SetStateAction<T>>
) => {
  Object.entries(errors).forEach((entry) => {
    const [keys, val] = entry;
    if (!(val instanceof Array)) {
      setBackendErrors((state) => ({
        ...state,
        [keys]: { error: val.errors[0] },
      }));
    } else {
      setBackendErrors((state) => ({
        ...state,
        [keys]: { error: undefined },
      }));
    }
  });
};

export default getBackendErrors;
