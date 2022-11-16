import useLoginForm from "../../../hooks/useLoginForm";
import { SubmitType } from "../../../interfaces/LoginFormType";
import InputCustom from "../../InputCustom/InputCustom";
import Loading from "../../Loading/Loading";
import { Form, SubmitBtn } from "./styles/styles";

interface ILoginFormProps {
  submitBtnText?: string;
  onSubmit: SubmitType;
}

const defaultProps = {
  submitBtnText: "Zaloguj sie",
};

export default function LoginForm({
  onSubmit,
  submitBtnText,
}: ILoginFormProps) {
  const {
    formVal,
    onChange,
    onSubmitHandler,
    backendErrors,
    loading,
    isErrorForm,
  } = useLoginForm();

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

LoginForm.defaultProps = defaultProps;
