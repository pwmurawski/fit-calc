import { useContext } from "react";
import MealsTable from "../components/MealsTable/MealsTable";
import WeekSlider from "../components/WeekSlider/WeekSlider";
import SummaryCaloriesAndMacros from "../components/SummaryCaloriesAndMacros/SummaryCaloriesAndMacros";
import GlobalContext from "../context/GlobalContext/GlobalContext";
import userAuth from "../helpers/userAuth";
import { IGetServerProps } from "../interfaces/IGetServerProps";
import useGetMealsSummaryMacroData from "../hooks/useGetMealsSummaryMacroData";

export const getServerSideProps = async ({ req, res }: IGetServerProps) => {
  const { token } = userAuth(req, res);
  if (!token)
    return {
      redirect: {
        destination: "/login",
      },
    };

  return { props: {} };
};

export default function Home() {
  const { dispatch } = useContext(GlobalContext);
  const { mealsData, summaryData } = useGetMealsSummaryMacroData();

  return (
    <>
      <WeekSlider onClickDay={(date) => dispatch({ type: "setDate", date })} />
      <MealsTable mealsData={mealsData} />
      <SummaryCaloriesAndMacros summaryCalorieMacroData={summaryData} />
    </>
  );
}
