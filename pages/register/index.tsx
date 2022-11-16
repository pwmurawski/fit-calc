import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import userAuth from "../../helpers/userAuth";
import useAuth from "../../hooks/useAuth";
import { IGetServerProps } from "../../interfaces/IGetServerProps";

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

export default function Register() {
  const { registerHandler } = useAuth();

  return (
    <LoginForm onSubmit={registerHandler} submitBtnText="Zarejestruj się" />
  );
}
