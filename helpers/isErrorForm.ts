import { ValuesType } from "../interfaces/FormValidType";

const isErrorForm = (formVal: { [s: string]: ValuesType }) => {
  let status = false;
  Object.values(formVal).forEach((val) => {
    if (val.error) status = true;
    if (val.rules.toString().includes("required")) {
      if (val.value.length === 0) status = true;
    }
  });
  return status;
};

export default isErrorForm;
