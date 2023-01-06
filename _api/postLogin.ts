import { ILoginFormValue } from "../types/ILoginFormValue";
import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const postLogin = async (body: ILoginFormValue) => {
  const data = await fitCalcApi("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return ResponseSchema.parse(data);
};

export default postLogin;
