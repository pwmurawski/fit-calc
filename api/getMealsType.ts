import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { IMealResponse } from "../interfaces/IMealResponse";
import fitCalcApi from "./fitCalcApi";

const getMealsType = async (req?: NextApiRequest, res?: NextApiResponse) => {
  const data = await fitCalcApi<IMealResponse[]>("/meals", {
    headers: {
      Authorization: `Bearer ${getCookie("token", { req, res })}`,
    },
  });
  return data;
};

export default getMealsType;
