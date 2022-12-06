import { FormInitType } from "../../../types/FormTypes";
import InputCustom from "../../InputCustom/InputCustom";
import { AddBtn, Form } from "./styles/styles";
import Loading from "../../Loading/Loading";
import useForm from "../../../hooks/useForm";
import {
  DefaultValueType,
  KeysType,
  SubmitType,
} from "../../../types/FoodProductFormTypes";

interface IFoodProductFormProps {
  submit: SubmitType;
  defaultValue?: DefaultValueType;
}

const defaultProps = {
  defaultValue: undefined,
};

const initForm: FormInitType<KeysType> = {
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

export default function FoodProductForm({
  submit,
  defaultValue = undefined,
}: IFoodProductFormProps) {
  const {
    formVal,
    onChange,
    backendErrors,
    isErrorForm,
    loading,
    onSubmitHandler,
  } = useForm(initForm, defaultValue);

  return (
    <>
      {loading ? <Loading stopClick /> : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(submit);
        }}
      >
        <InputCustom
          type="text"
          placeholder="Name"
          value={formVal.name.value}
          onChange={(e) => onChange(e.target.value, "name")}
          error={backendErrors?.name?.error ?? formVal.name.error}
        />
        <InputCustom
          type="number"
          min={0}
          placeholder="Kcal"
          value={formVal.kcal.value}
          onChange={(e) => onChange(e.target.value, "kcal")}
          error={backendErrors?.kcal?.error ?? formVal.kcal.error}
        />
        <InputCustom
          type="number"
          min={0}
          placeholder="Protein"
          value={formVal.protein.value}
          onChange={(e) => onChange(e.target.value, "protein")}
          error={backendErrors?.protein?.error ?? formVal.protein.error}
        />
        <InputCustom
          type="number"
          min={0}
          placeholder="Fat"
          value={formVal.fat.value}
          onChange={(e) => onChange(e.target.value, "fat")}
          error={backendErrors?.fat?.error ?? formVal.fat.error}
        />
        <InputCustom
          type="number"
          min={0}
          placeholder="Carbs"
          value={formVal.carbs.value}
          onChange={(e) => onChange(e.target.value, "carbs")}
          error={backendErrors?.carbs?.error ?? formVal.carbs.error}
        />
        <InputCustom
          type="number"
          min={0}
          placeholder="Code"
          value={formVal.code.value}
          onChange={(e) => onChange(e.target.value, "code")}
          error={backendErrors?.code?.error ?? formVal.code.error}
        />
        {!isErrorForm(formVal) ? (
          <AddBtn type="submit">Dodaj</AddBtn>
        ) : (
          <AddBtn isError type="button">
            Dodaj
          </AddBtn>
        )}
      </Form>
    </>
  );
}

FoodProductForm.defaultProps = defaultProps;
