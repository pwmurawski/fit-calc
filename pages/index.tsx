import useSWRImmutable from 'swr/immutable';
import { format } from 'date-fns';
import MealsTable from '../components/MealsTable/MealsTable';
import WeekSlider from '../components/WeekSlider/WeekSlider';
import SummaryCaloriesAndMacros from '../components/SummaryCaloriesAndMacros/SummaryCaloriesAndMacros';
import useGetMealsSummaryMacroData from '../hooks/useGetMealsSummaryMacroData';
import useDate from '../hooks/useDate';
import getDailyGoals from '../_api/getDailyGoals';
import { Secured } from 'components/security/secured';
import { NextPage } from 'next';
import Head from 'next/head';
import { AccountType } from 'types/enum';

const Home: NextPage = () => {
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

export default Home;

function HomeView() {
    const { date, setDate } = useDate();
    const localeDate = format(date, 'yyyy-MM-dd');
    const { mealsData, summaryData } = useGetMealsSummaryMacroData();
    const { data: dailyGoals } = useSWRImmutable(
        `/dailyGoals/${new Date(date.toDateString()) >= new Date(new Date().toDateString()) ? 'current' : localeDate}`,
        () => getDailyGoals(localeDate),
    );

    return (
        <>
            <WeekSlider onClickDay={(value) => setDate(value)} />
            <MealsTable mealsData={mealsData} />
            <SummaryCaloriesAndMacros summaryCalorieMacroData={summaryData} limitMacro={dailyGoals?.data} />
        </>
    );
}
