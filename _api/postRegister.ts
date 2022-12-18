import { ILoginFormValue } from "../types/ILoginFormValue";
import fitCalcApi from "./fitCalcApi";

const postRegister = async (body: ILoginFormValue) => {
  const data = await fitCalcApi<undefined, keyof ILoginFormValue>("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return data;
};

export default postRegister;
