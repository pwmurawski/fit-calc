/* eslint-disable no-empty */
import { deleteCookie } from "cookies-next";
import { COOKIE_KEY_USER } from "../helpers/userAuth";
import { ReqType, ResType } from "../types/GetServerPropsTypes";
import { IResponse } from "../types/ResponseTypes";

const fitCalcApi = async <Data, ErrorsKeys extends string = string>(
  url: string,
  options?: RequestInit,
  req?: ReqType,
  res?: ResType
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}${url}`, options);
    const data: IResponse<Data, ErrorsKeys> = {
      ...(response.status !== 204 ? await response.json() : null),
      status: response.status,
    };

    // if (data.status === 401) {
    //   deleteCookie(COOKIE_KEY_USER, { req, res });
    //   window.location.pathname = "/login";
    // }

    return data;
  } catch {}
  return undefined;
};

export default fitCalcApi;
