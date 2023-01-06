import { ILoginFormValue } from "../types/ILoginFormValue";
import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const postRegister = async (body: ILoginFormValue) => {
  const data = await fitCalcApi("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return ResponseSchema.parse(data);
};

export default postRegister;
