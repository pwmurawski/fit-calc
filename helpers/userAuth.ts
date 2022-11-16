import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

const COOKIE_KEY = "token";
const reg = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\\+\\/=]*)/;

const userAuth = (req?: NextApiRequest, res?: NextApiResponse) => {
  const login = (token: string) => {
    setCookie(COOKIE_KEY, token, { req, res });
  };

  const logout = () => {
    deleteCookie(COOKIE_KEY, { req, res });
  };

  const token = getCookie(COOKIE_KEY, { req, res });
  if (token) {
    if (reg.test(token.toString())) return { token, login, logout };
  }
  return { login, logout };
};

export default userAuth;
