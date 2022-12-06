import AuthForm from "../../components/Forms/AuthForm/AuthForm";
import userAuth from "../../helpers/userAuth";
import useAuth from "../../hooks/useAuth";
import { IGetServerProps } from "../../types/IGetServerProps";

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

export default function Register() {
  const { registerHandler } = useAuth();

  return (
    <AuthForm onSubmit={registerHandler} submitBtnText="Zarejestruj się" />
  );
}
