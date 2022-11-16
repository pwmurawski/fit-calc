import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { IBodySelectedProduct } from "../interfaces/IBodySelectedProduct";
import fitCalcApi from "./fitCalcApi";

const postSelectedProduct = async (
  body: IBodySelectedProduct,
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  const data = await fitCalcApi<{ id: string }>("/selectedProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token", { req, res })}`,
    },
    body: JSON.stringify(body),
  });

  return data;
};

export default postSelectedProduct;
