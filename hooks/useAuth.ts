import { useRouter } from "next/router";
import getLogout from "../api/getLogout";
import getUserId from "../api/getUserId";
import postLogin from "../api/postLogin";
import postRegister from "../api/postRegister";
import userAuth from "../helpers/userAuth";
import { ILoginFormValue } from "../types/ILoginFormValue";

const useAuth = () => {
  const { isUser, login, logout } = userAuth();
  const { push } = useRouter();

  const loginHandler = async (formValue: ILoginFormValue) => {
    const res = await postLogin(formValue);
    const resp = await getUserId();
    if (res?.status === 204 && resp?.data) {
      login(resp.data.userId);
      push("/");
    }
    return res?.errors?.children;
  };

  const logoutHandler = async () => {
    const res = await getLogout();
    if (res?.status === 204) {
      logout();
      push("/login");
    }
  };

  const registerHandler = async (formValue: ILoginFormValue) => {
    const res = await postRegister(formValue);
    if (res?.status === 204) {
      push("/login");
    }
    return res?.errors?.children;
  };

  return { isUser, loginHandler, logoutHandler, registerHandler };
};

export default useAuth;
