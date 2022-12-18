import AuthForm from "../../components/Forms/AuthForm/AuthForm";
import userAuth from "../../helpers/userAuth";
import useAuth from "../../hooks/useAuth";
import { KeysType } from "../../types/AuthFormTypes";
import { FormInitType } from "../../types/FormTypes";
import { IGetServerProps } from "../../types/GetServerPropsTypes";

const initFormValue: FormInitType<KeysType> = {
  username: {
    value: "",
    rules: ["required", "email"],
  },
  password: {
    value: "",
    rules: ["required", { rule: "min", length: 5 }],
  },
};

export default function Register() {
  const { registerHandler } = useAuth();

  return (
    <AuthForm
      initFormValue={initFormValue}
      onSubmit={registerHandler}
      submitBtnText="Zarejestruj się"
    />
  );
}
