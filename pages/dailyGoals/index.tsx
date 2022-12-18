import { useState } from "react";
import DailyGoalsForm from "../../components/Forms/DailyGoalsForm/DailyGoalsForm";
import SummaryDailyGoals from "../../components/SummaryDailyGoals/SummaryDailyGoals";
import userAuth from "../../helpers/userAuth";
import useEditDailyGoals from "../../hooks/useEditDailyGoals";
import { IGetServerProps } from "../../types/GetServerPropsTypes";

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

export default function DailyGoals() {
  const [totalPercent, setTotalPercent] = useState(0);
  const { addDailyGoals, defaultValue } = useEditDailyGoals();

  return (
    <>
      <DailyGoalsForm
        onSubmit={addDailyGoals}
        onPercent={(data) => setTotalPercent(data)}
        defaultValue={defaultValue}
      />
      <SummaryDailyGoals totalPercent={totalPercent} />
    </>
  );
}
