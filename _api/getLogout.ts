import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const getLogout = async () => {
  const data = await fitCalcApi("/logout", {
    credentials: "include",
  });

  return ResponseSchema.parse(data);
};

export default getLogout;
