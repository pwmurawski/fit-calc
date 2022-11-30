import AuthForm from "../../components/Forms/AuthForm/AuthForm";
import userAuth from "../../helpers/userAuth";
import { IGetServerProps } from "../../interfaces/IGetServerProps";
import useAuth from "../../hooks/useAuth";

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

  return <AuthForm onSubmit={loginHandler} />;
}
