import { IBodyDailyGoals } from "../types/DailyGoalsTypes";
import fitCalcApi from "./fitCalcApi";

const postDailyGoals = async (body: IBodyDailyGoals) => {
  const data = await fitCalcApi<{ id: string }>("/dailyGoals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return data;
};

export default postDailyGoals;
