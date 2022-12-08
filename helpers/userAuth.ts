import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { ReqType, ResType } from "../types/GetServerPropsTypes";

export const COOKIE_KEY_USER = "isUserLogin";

const userAuth = (req?: ReqType, res?: ResType) => {
  const login = (userId: string) => {
    setCookie(COOKIE_KEY_USER, userId, { req, res });
  };

  const logout = () => {
    deleteCookie(COOKIE_KEY_USER, { req, res });
  };

  const isUser = getCookie(COOKIE_KEY_USER, { req, res })?.toString();

  return { isUser, login, logout };
};

export default userAuth;
