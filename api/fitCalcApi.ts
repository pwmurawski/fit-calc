/* eslint-disable no-empty */
import { deleteCookie } from "cookies-next";
import { IResponse } from "../interfaces/IResponse";

const fitCalcApi = async <Data, ErrorsKeys extends string = string>(
  url: string,
  options?: RequestInit
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}${url}`, options);
    const data: IResponse<Data, ErrorsKeys> = {
      ...(await response.json()),
      status: response.status,
    };

    if (data.status === 401) {
      deleteCookie("token");
      window.location.pathname = "/login";
    }

    return data;
  } catch {}
  return undefined;
};

export default fitCalcApi;
