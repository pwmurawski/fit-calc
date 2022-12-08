import MealsTable from "../components/MealsTable/MealsTable";
import WeekSlider from "../components/WeekSlider/WeekSlider";
import SummaryCaloriesAndMacros from "../components/SummaryCaloriesAndMacros/SummaryCaloriesAndMacros";
import userAuth from "../helpers/userAuth";
import { IGetServerProps } from "../types/GetServerPropsTypes";
import useGetMealsSummaryMacroData from "../hooks/useGetMealsSummaryMacroData";
import useDate from "../hooks/useDate";

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
  const { mealsData, summaryData } = useGetMealsSummaryMacroData();
  const { setDate } = useDate();

  return (
    <>
      <WeekSlider onClickDay={(date) => setDate(date)} />
      <MealsTable mealsData={mealsData} />
      <SummaryCaloriesAndMacros summaryCalorieMacroData={summaryData} />
    </>
  );
}
