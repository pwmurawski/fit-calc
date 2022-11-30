import useForm from "../../../hooks/useForm";
import { FormInitType } from "../../../interfaces/FormTypes";
import { KeysType, SubmitType } from "../../../interfaces/AuthFormTypes";
import InputCustom from "../../InputCustom/InputCustom";
import Loading from "../../Loading/Loading";
import { Form, SubmitBtn } from "./styles/styles";

const initFormValue: FormInitType<KeysType> = {
  username: {
    value: "",
    rules: ["email", "required"],
  },
  password: {
    value: "",
    rules: [{ rule: "min", length: 4 }, "required"],
  },
};

interface IAuthFormProps {
  submitBtnText?: string;
  onSubmit: SubmitType;
}

const defaultProps = {
  submitBtnText: "Zaloguj sie",
};

export default function AuthForm({ onSubmit, submitBtnText }: IAuthFormProps) {
  const {
    formVal,
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
          value={formVal.username.value}
          onChange={(e) => onChange(e.target.value, "username")}
          error={backendErrors?.username?.error ?? formVal.username.error}
        />
        <InputCustom
          type="password"
          placeholder="Hasło"
          value={formVal.password.value}
          onChange={(e) => onChange(e.target.value, "password")}
          error={backendErrors?.password?.error ?? formVal.password.error}
        />
        {!isErrorForm(formVal) ? (
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
