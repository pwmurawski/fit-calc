import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import userAuth from "../../helpers/userAuth";
import { IGetServerProps } from "../../interfaces/IGetServerProps";
import useAuth from "../../hooks/useAuth";

export const getServerSideProps = async ({ req, res }: IGetServerProps) => {
  const { token } = userAuth(req, res);
  if (token)
    return {
      redirect: {
        destination: "/",
      },
    };

  return { props: {} };
};

export default function Login() {
  const { loginHandler } = useAuth();

  return <LoginForm onSubmit={loginHandler} />;
}
