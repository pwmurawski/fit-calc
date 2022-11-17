import { SubmitType } from "../../../interfaces/FormAddFoodProductType";
import InputCustom from "../../InputCustom/InputCustom";
import { AddBtn, Form } from "./styles/styles";
import Loading from "../../Loading/Loading";
import useAddFoodProductForm from "../../../hooks/useAddFoodProductForm";

interface IAddFoodProductFormProps {
  submit: SubmitType;
}

export default function AddFoodProductForm({
  submit,
}: IAddFoodProductFormProps) {
  const {
    formVal,
    onChange,
    onSubmitHandler,
    backendErrors,
    loading,
    isErrorForm,
  } = useAddFoodProductForm();

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
