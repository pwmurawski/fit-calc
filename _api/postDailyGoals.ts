import { z } from "zod";
import { BodyDailyGoalsType } from "../types/DailyGoalsTypes";
import { ResponseSchema } from "../types/ResponseTypes";
import fitCalcApi from "./fitCalcApi";

const postDailyGoals = async (body: BodyDailyGoalsType) => {
  const data = await fitCalcApi("/dailyGoals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return ResponseSchema.and(
    z.object({ data: z.object({ id: z.string() }).optional() }).optional()
  ).parse(data);
};

export default postDailyGoals;
