import { useRouter } from "next/router";
import getLogout from "../_api/getLogout";
import getUserId from "../_api/getUserId";
import postLogin from "../_api/postLogin";
import postRegister from "../_api/postRegister";
import userAuth from "../helpers/userAuth";
import { ILoginFormValue } from "../types/ILoginFormValue";
import useLoading from "./useLoading";

const useAuth = () => {
  const { isUser, login, logout } = userAuth();
  const { push } = useRouter();
  const { setLoading } = useLoading();

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
    setLoading(true);
    const res = await getLogout();
    if (res?.status === 204) {
      logout();
      push("/login");
    }
    setLoading(false);
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
