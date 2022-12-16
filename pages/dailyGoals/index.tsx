import { useState } from "react";
import DailyGoalsForm from "../../components/Forms/DailyGoalsForm/DailyGoalsForm";
import SummaryDailyGoals from "../../components/SummaryDailyGoals/SummaryDailyGoals";
import useEditDailyGoals from "../../hooks/useEditDailyGoals";

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
