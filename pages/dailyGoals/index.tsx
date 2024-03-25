import { useMemo, useState } from 'react';
import DailyGoalsForm from '../../components/Forms/DailyGoalsForm/DailyGoalsForm';
import SummaryDailyGoals from '../../components/SummaryDailyGoals/SummaryDailyGoals';
import { Secured } from 'components/security/secured';
import { AccountType } from 'types/enum';
import Head from 'next/head';
import { useDailyGoals } from 'hooks/useDailyGoals';
import Loading from 'components/Loading/Loading';
import { Layout } from 'components/Layouts/Layout';
import { NextPageWithLayout } from 'pages/_app';

const DailyGoals: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Daily goals</title>
            </Head>
            <DailyGoalsView />
        </>
    );
};

DailyGoals.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default DailyGoals;

function DailyGoalsView() {
    const [totalPercent, setTotalPercent] = useState(0);
    const dailyGoals = useDailyGoals(true);

    const initialValues = useMemo(
        () => ({
            kcal: dailyGoals?.data?.kcal.toString() ?? '',
            protein: dailyGoals?.data?.protein.toString() ?? '',
            fat: dailyGoals?.data?.fat.toString() ?? '',
            carbs: dailyGoals?.data?.carbs.toString() ?? '',
        }),
        [dailyGoals?.data],
    );

    if (!dailyGoals) {
        return <Loading />;
    }
    return (
        <>
            <DailyGoalsForm
                onSubmit={dailyGoals.changeDailyGoals}
                onPercent={(data) => setTotalPercent(data)}
                initialValues={initialValues}
            />
            <SummaryDailyGoals totalPercent={totalPercent} />
        </>
    );
}
