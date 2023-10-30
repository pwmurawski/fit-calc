import MealsTable from '../components/MealsTable/MealsTable';
import WeekSlider from '../components/WeekSlider/WeekSlider';
import SummaryCaloriesAndMacros from '../components/SummaryCaloriesAndMacros/SummaryCaloriesAndMacros';
import { useDayData } from '../hooks/useDayData';
import { useSelectedDate } from '../hooks/useSelectedDate';
import { Secured } from 'components/security/secured';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { AccountType } from 'types/enum';
import { useDailyGoals } from 'hooks/useDailyGoals';
import { Layout } from 'components/Layouts/Layout';

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Home</title>
            </Head>
            <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
                <HomeView />
            </Secured>
        </>
    );
};

Home.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Home;

function HomeView() {
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
