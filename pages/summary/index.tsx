import { Layout } from 'components/Layouts/Layout';
import { Secured } from 'components/security/secured';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { AccountType } from 'types/enum';
import { useSummaryByDateRange } from 'hooks/useSummaryByDateRange';
import { useState } from 'react';
import { SummarySlider } from 'components/SummarySlider/SummarySlider';
import { BarChart } from 'components/BarChart/BarChart';
import { SummaryDataView } from 'components/SummaryDataView/SummaryDataView';
import { GeneratePdfBtn } from 'components/GeneratePdfBtn/GeneratePdfBtn';
import { generatePdf } from '_api/pdf';
import { SummarySliderPdf } from 'components/Pdf/SummarySlider/SummarySliderPdf';
import MealsTablePdf from 'components/Pdf/MealsTable/MealsTable';
import { toUTC } from 'helpers/toUTC';

const Summary: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Summary</title>
            </Head>
            <SummaryView />
        </>
    );
};

Summary.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default Summary;

const SummaryView = () => {
    const [date, setDate] = useState({
        start: toUTC(new Date()),
        end: toUTC(new Date()),
    });

    const getDate = (start: Date, end: Date) => {
        setDate({ start: toUTC(start), end: toUTC(end) });
    };

    const summary = useSummaryByDateRange(date.start, date.end);

    const handleGeneratePdf = async () => {
        const res = await generatePdf({ action: 'summary-pdf', date });

        if (res?.status === 'OK') {
            const blobUrl = URL.createObjectURL(res.pdf);
            window.open(blobUrl);
        }
    };

    return (
        <>
            <SummarySlider getDate={getDate} />
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', gap: '10px' }}>
                <BarChart summary={summary} />
                <SummaryDataView summary={summary} />
                {summary?.daysData?.map(({ mealsData, date }, idx) => (
                    <div key={idx}>
                        <SummarySliderPdf startDate={date} endDate={date} />
                        <MealsTablePdf mealsData={mealsData} />
                    </div>
                ))}
            </div>
            <GeneratePdfBtn onClick={handleGeneratePdf} />
        </>
    );
};
