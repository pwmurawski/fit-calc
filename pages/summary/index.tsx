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

export function SummaryView() {
    const [date, setDate] = useState({
        start: new Date(),
        end: new Date(),
    });
    const summary = useSummaryByDateRange(date.start, date.end);

    const getDate = (start: Date, end: Date) => {
        setDate({ start, end });
    };

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
            <div style={{ overflow: 'auto' }}>
                <BarChart summary={summary} />
                <SummaryDataView summary={summary} />
            </div>
            <GeneratePdfBtn onClick={handleGeneratePdf} />
        </>
    );
}
