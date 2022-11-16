import { useRouter } from "next/router";
import postLogin from "../api/postLogin";
import postRegister from "../api/postRegister";
import userAuth from "../helpers/userAuth";
import { ILoginFormValue } from "../interfaces/ILoginFormValue";

const useAuth = () => {
  const { token, login, logout } = userAuth();
  const { push } = useRouter();

  const loginHandler = async (formValue: ILoginFormValue) => {
    const res = await postLogin(formValue);
    if (res?.token) {
      login(res.token);
      push("/");
    }
    return res;
  };

  const logoutHandler = () => {
    logout();
    push("/login");
  };

  const registerHandler = async (formValue: ILoginFormValue) => {
    const res = await postRegister(formValue);
    if (res?.status === 200) {
      push("/login");
    }
    return res;
  };

  return { token, loginHandler, logoutHandler, registerHandler };
};

export default useAuth;
