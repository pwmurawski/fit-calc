import { ResponseDailyGoalsSchema } from "../types/DailyGoalsTypes";
import fitCalcApi from "./fitCalcApi";

const getDailyGoals = async (date: string) => {
  const data = await fitCalcApi(`/dailyGoals/${date}`, {
    credentials: "include",
  });

  return ResponseDailyGoalsSchema.parse(data);
};

export default getDailyGoals;
