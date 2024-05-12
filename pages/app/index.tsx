import MealsTable from '../../components/MealsTable/MealsTable';
import WeekSlider from '../../components/WeekSlider/WeekSlider';
import SummaryCaloriesAndMacros from '../../components/SummaryCaloriesAndMacros/SummaryCaloriesAndMacros';
import { useDayData } from '../../hooks/useDayData';
import { useSelectedDate } from '../../hooks/useSelectedDate';
import { Secured } from 'components/security/secured';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { AccountType } from 'types/enum';
import { useDailyGoals } from 'hooks/useDailyGoals';
import { Layout } from 'components/Layouts/Layout';

const App: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | App</title>
            </Head>
            <AppView />
        </>
    );
};

App.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default App;

function AppView() {
    const { setDate } = useSelectedDate();
    const dayData = useDayData();
    const dailyGoals = useDailyGoals();

    return (
        <>
            <WeekSlider onClickDay={(value) => setDate(value)} />
            <MealsTable mealsData={dayData?.mealsData} />
            <SummaryCaloriesAndMacros summaryCalorieMacroData={dayData?.summaryData} limitMacro={dailyGoals?.data} />
        </>
    );
}
