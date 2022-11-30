import { ILoginFormValue } from "../interfaces/ILoginFormValue";
import fitCalcApi from "./fitCalcApi";

const postLogin = async (body: ILoginFormValue) => {
  const data = await fitCalcApi<undefined, keyof ILoginFormValue>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return data;
};

export default postLogin;
