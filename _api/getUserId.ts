import { z } from "zod";
import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const getUserId = async () => {
  const data = await fitCalcApi("/userId", {
    credentials: "include",
  });

  return ResponseSchema.and(
    z.object({ data: z.object({ userId: z.string() }).optional() }).optional()
  ).parse(data);
};

export default getUserId;
