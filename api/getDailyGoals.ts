import { IDailyGoals } from "../types/DailyGoalsTypes";
import fitCalcApi from "./fitCalcApi";

const getDailyGoals = async (date: string) => {
  const data = await fitCalcApi<IDailyGoals>(`/dailyGoals/${date}`, {
    credentials: "include",
  });
  return data;
};

export default getDailyGoals;
