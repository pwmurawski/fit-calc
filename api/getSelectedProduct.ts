import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { ISelectedProductResponse } from "../interfaces/ISelectedProductResponse";
import fitCalcApi from "./fitCalcApi";

const getSelectedProductDay = async (
  date?: string,
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  const data = await fitCalcApi<ISelectedProductResponse[]>(
    `/selectedProduct/day/${date}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("token", { req, res })}`,
      },
    }
  );
  return data;
};

export default getSelectedProductDay;
