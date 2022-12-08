import AuthForm from "../../components/Forms/AuthForm/AuthForm";
import userAuth from "../../helpers/userAuth";
import { IGetServerProps } from "../../types/GetServerPropsTypes";
import useAuth from "../../hooks/useAuth";
import { FormInitType } from "../../types/FormTypes";
import { KeysType } from "../../types/AuthFormTypes";

const initFormValue: FormInitType<KeysType> = {
  username: {
    value: "",
    rules: ["required", "email"],
  },
  password: {
    value: "",
    rules: ["required"],
  },
};

export const getServerSideProps = async ({ req, res }: IGetServerProps) => {
  const { isUser } = userAuth(req, res);
  if (isUser)
    return {
      redirect: {
        destination: "/",
      },
    };

  return { props: {} };
};

export default function Login() {
  const { loginHandler } = useAuth();

  return <AuthForm initFormValue={initFormValue} onSubmit={loginHandler} />;
}
