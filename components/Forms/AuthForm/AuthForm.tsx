import useForm from "../../../hooks/useForm";
import { FormInitType } from "../../../types/FormTypes";
import { KeysType, SubmitType } from "../../../types/AuthFormTypes";
import InputCustom from "../../InputCustom/InputCustom";
import Loading from "../../Loading/Loading";
import { Form, SubmitBtn } from "./styles/styles";

interface IAuthFormProps {
  submitBtnText?: string;
  onSubmit: SubmitType;
  initFormValue: FormInitType<KeysType>;
}

const defaultProps = {
  submitBtnText: "Zaloguj sie",
};

export default function AuthForm({
  initFormValue,
  onSubmit,
  submitBtnText,
}: IAuthFormProps) {
  const {
    formValue,
    onChange,
    onSubmitHandler,
    loading,
    backendErrors,
    isErrorForm,
  } = useForm(initFormValue);

  return (
    <>
      {loading ? <Loading /> : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(onSubmit);
        }}
      >
        <InputCustom
          type="text"
          placeholder="Email"
          value={formValue.username.value}
          onChange={(e) => onChange(e.target.value, "username")}
          error={formValue.username.error ?? backendErrors?.username?.error}
        />
        <InputCustom
          type="password"
          placeholder="Hasło"
          value={formValue.password.value}
          onChange={(e) => onChange(e.target.value, "password")}
          error={formValue.password.error ?? backendErrors?.password?.error}
        />
        {!isErrorForm(formValue) ? (
          <SubmitBtn type="submit">{submitBtnText}</SubmitBtn>
        ) : (
          <SubmitBtn isError type="button">
            {submitBtnText}
          </SubmitBtn>
        )}
      </Form>
    </>
  );
}

AuthForm.defaultProps = defaultProps;
