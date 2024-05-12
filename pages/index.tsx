import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { MainLayout } from 'components/Layouts/MainLayout/MainLayout';
import { FirstSection } from 'components/HomeView/FirstSection/FirstSection';
import { SecondSection } from 'components/HomeView/SecondSection/SecondSection';
import { ThirdSection } from 'components/HomeView/ThirdSection/ThirdSection';
import { FourthSection } from 'components/HomeView/FourthSection/FourthSection';
import { Footer } from 'components/HomeView/Footer/Footer';

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Home</title>
            </Head>
            <HomeView />
        </>
    );
};

Home.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export default Home;

function HomeView() {
    return (
        <>
            <FirstSection />
            <SecondSection />
            <ThirdSection />
            <FourthSection />
            <Footer />
        </>
    );
}
