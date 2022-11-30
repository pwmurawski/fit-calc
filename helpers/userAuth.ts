import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { ReqType, ResType } from "../interfaces/IGetServerProps";

export const COOKIE_KEY_USER = "isUserLogin";

const userAuth = (req?: ReqType, res?: ResType) => {
  const login = () => {
    setCookie(COOKIE_KEY_USER, true, { req, res });
  };

  const logout = () => {
    deleteCookie(COOKIE_KEY_USER, { req, res });
  };

  const isUser = getCookie(COOKIE_KEY_USER, { req, res });

  return { isUser, login, logout };
};

export default userAuth;
