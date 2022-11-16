import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import fitCalcApi from "./fitCalcApi";

const deleteSelectedProduct = async (
  id: string,
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  const data = await fitCalcApi<[]>(`/selectedProduct/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token", { req, res })}`,
    },
  });

  return data;
};

export default deleteSelectedProduct;
