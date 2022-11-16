import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { KeysType } from "../interfaces/FormAddFoodProductType";
import { IAddFoodProductFormVal } from "../interfaces/IAddFoodProductFormVal";
import fitCalcApi from "./fitCalcApi";

const postFoodProduct = async (
  body?: IAddFoodProductFormVal,
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  const data = await fitCalcApi<{ id: string }, KeysType>("/foodProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token", { req, res })}`,
    },
    body: JSON.stringify(body),
  });
  return data;
};

export default postFoodProduct;
