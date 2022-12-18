import useSWRImmutable from "swr/immutable";
import { format } from "date-fns";
import MealsTable from "../components/MealsTable/MealsTable";
import WeekSlider from "../components/WeekSlider/WeekSlider";
import SummaryCaloriesAndMacros from "../components/SummaryCaloriesAndMacros/SummaryCaloriesAndMacros";
import userAuth from "../helpers/userAuth";
import { IGetServerProps } from "../types/GetServerPropsTypes";
import useGetMealsSummaryMacroData from "../hooks/useGetMealsSummaryMacroData";
import useDate from "../hooks/useDate";
import getDailyGoals from "../api/getDailyGoals";

export const getServerSideProps = async ({ req, res }: IGetServerProps) => {
  const { isUser } = userAuth(req, res);
  if (!isUser)
    return {
      redirect: {
        destination: "/login",
      },
    };

  return { props: {} };
};

export default function Home() {
  const { date, setDate } = useDate();
  const localeDate = format(date, "yyyy-MM-dd");
  // const { mealsData, summaryData } = useGetMealsSummaryMacroData();
  // const { data: dailyGoals } = useSWRImmutable(
  //   `/dailyGoals/${
  //     new Date(date.toDateString()) >= new Date(new Date().toDateString())
  //       ? "current"
  //       : localeDate
  //   }`,
  //   () => getDailyGoals(localeDate)
  // );

  return (
    <>
      <WeekSlider onClickDay={(value) => setDate(value)} />
      <MealsTable mealsData={undefined} />
      <SummaryCaloriesAndMacros
        summaryCalorieMacroData={undefined}
        limitMacro={undefined}
      />
    </>
  );
}
