import { useState } from "react";
import DailyGoalsForm from "../../components/Forms/DailyGoalsForm/DailyGoalsForm";
import SummaryDailyGoals from "../../components/SummaryDailyGoals/SummaryDailyGoals";
import useEditDailyGoals from "../../hooks/useEditDailyGoals";
import { NextPage } from "next";
import { Secured } from "components/security/secured";
import { AccountType } from "types/enum";
import Head from "next/head";

const DailyGoals: NextPage = () => {
  return (
      <>
          <Head>
              <title>FitCalc | Daily goals</title>
          </Head>
          <Secured
              authorities={[AccountType.Standard, AccountType.Admin,]}
          >
              <DailyGoalsView />
          </Secured>
      </>
  );
};

export default DailyGoals;

function DailyGoalsView() {
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
