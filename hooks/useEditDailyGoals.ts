import { useRouter } from "next/router";
import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import getDailyGoals from "../api/getDailyGoals";
import postDailyGoals from "../api/postDailyGoals";
import { IBodyDailyGoals } from "../types/DailyGoalsTypes";

const useEditDailyGoals = () => {
  const { push } = useRouter();
  const currentDate = new Date().toLocaleDateString();
  const { data: dailyGoals, mutate } = useSWRImmutable(
    `/dailyGoals/${currentDate}`,
    () => getDailyGoals(currentDate)
  );

  const addDailyGoals = async (data: IBodyDailyGoals) => {
    const res = await postDailyGoals(data);
    if (res?.data) {
      await mutate();
      push("/");
    }
  };

  const defaultValue = useMemo(
    () => ({
      kcal: dailyGoals?.data?.kcal.toString(),
      protein: dailyGoals?.data?.protein.toString(),
      fat: dailyGoals?.data?.fat.toString(),
      carbs: dailyGoals?.data?.carbs.toString(),
    }),
    [dailyGoals]
  );

  return {
    addDailyGoals,
    defaultValue,
  };
};

export default useEditDailyGoals;
