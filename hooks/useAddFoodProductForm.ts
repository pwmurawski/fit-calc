import { useState } from "react";
import {
  FormAddFoodProductType,
  SubmitType,
} from "../interfaces/FormAddFoodProductType";
import { IAddFoodProductFormVal } from "../interfaces/IAddFoodProductFormVal";
import useForm from "./useForm";

const initForm: FormAddFoodProductType = {
  name: {
    value: "",
    rules: [{ rule: "min", length: 3 }, "required"],
  },
  kcal: {
    value: "",
    rules: ["required"],
  },
  protein: {
    value: "",
    rules: ["required"],
  },
  fat: {
    value: "",
    rules: ["required"],
  },
  carbs: {
    value: "",
    rules: ["required"],
  },
  code: {
    value: "",
    rules: [],
  },
};

const useAddFoodProductForm = () => {
  const { formVal, onChange, backendErrors, setError, isErrorForm } =
    useForm(initForm);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (submit: SubmitType) => {
    setLoading(true);
    const formValue: IAddFoodProductFormVal = {
      name: formVal.name.value,
      kcal: formVal.kcal.value,
      protein: formVal.protein.value,
      fat: formVal.fat.value,
      carbs: formVal.carbs.value,
      code: formVal.code.value,
    };
    const res = await submit(formValue);
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

export default useAddFoodProductForm;
