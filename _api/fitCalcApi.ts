/* eslint-disable no-empty */
import { deleteCookie } from "cookies-next";
import { COOKIE_KEY_USER } from "../helpers/userAuth";
import { ReqType, ResType } from "../types/GetServerPropsTypes";

const fitCalcApi = async (
  url: string,
  options?: RequestInit,
  req?: ReqType,
  res?: ResType
): Promise<unknown> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}${url}`, options);
    const data = response.status !== 204 ? await response.json() : null;

    if (response.status === 401) {
      deleteCookie(COOKIE_KEY_USER, { req, res });
      window.location.pathname = "/login";
    }

    return {
      ...data,
      status: response.status,
    };
  } catch {}
  return undefined;
};

export default fitCalcApi;
