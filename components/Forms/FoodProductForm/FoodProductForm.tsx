import { FormInitType, SubmitType } from "../../../types/FormTypes";
import InputCustom from "../../InputCustom/InputCustom";
import { AddBtn, Form, ScannerContainer } from "./styles/styles";
import useForm from "../../../hooks/useForm";
import {
  DefaultValueType,
  KeysType,
} from "../../../types/FoodProductFormTypes";
import Scanner from "../../Scanner/Scanner";

const initForm: FormInitType<KeysType> = {
  name: {
    value: "",
    rules: ["required", { rule: "min", length: 3 }],
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

interface IFoodProductFormProps {
  submit: SubmitType<typeof initForm>;
  defaultValue?: DefaultValueType;
}

const defaultProps = {
  defaultValue: undefined,
};

export default function FoodProductForm({
  submit,
  defaultValue = undefined,
}: IFoodProductFormProps) {
  const { formValue, onChange, backendErrors, isErrorForm, onSubmitHandler } =
    useForm(initForm, defaultValue);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(submit);
      }}
    >
      <InputCustom
        type="text"
        placeholder="Name"
        value={formValue.name.value}
        onChange={(e) => onChange(e.target.value, "name")}
        error={formValue.name.error ?? backendErrors?.name?.error}
      />
      <InputCustom
        type="number"
        min={0}
        placeholder="Kcal"
        value={formValue.kcal.value}
        onChange={(e) => onChange(e.target.value, "kcal")}
        error={formValue.kcal.error ?? backendErrors?.kcal?.error}
      />
      <InputCustom
        type="number"
        min={0}
        placeholder="Protein"
        value={formValue.protein.value}
        onChange={(e) => onChange(e.target.value, "protein")}
        error={formValue.protein.error ?? backendErrors?.protein?.error}
      />
      <InputCustom
        type="number"
        min={0}
        placeholder="Fat"
        value={formValue.fat.value}
        onChange={(e) => onChange(e.target.value, "fat")}
        error={formValue.fat.error ?? backendErrors?.fat?.error}
      />
      <InputCustom
        type="number"
        min={0}
        placeholder="Carbs"
        value={formValue.carbs.value}
        onChange={(e) => onChange(e.target.value, "carbs")}
        error={formValue.carbs.error ?? backendErrors?.carbs?.error}
      />
      <ScannerContainer>
        <InputCustom
          type="number"
          min={0}
          placeholder="Code"
          value={formValue.code.value}
          onChange={(e) => onChange(e.target.value, "code")}
          error={formValue.code.error ?? backendErrors?.code?.error}
        />
        <Scanner onScanned={(data) => onChange(data, "code")} />
      </ScannerContainer>
      {!isErrorForm(formValue) ? (
        <AddBtn type="submit">Dodaj</AddBtn>
      ) : (
        <AddBtn isError type="button">
          Dodaj
        </AddBtn>
      )}
    </Form>
  );
}

FoodProductForm.defaultProps = defaultProps;
