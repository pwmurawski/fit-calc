import { Layout } from 'components/Layouts/Layout';
import { Secured } from 'components/security/secured';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { AccountType } from 'types/enum';
import { useSummaryByDateRange } from 'hooks/useSummaryByDateRange';
import { useState } from 'react';
import { format } from 'date-fns';
import { SummarySlider } from 'components/SummarySlider/SummarySlider';
import { BarChart } from 'components/BarChart/BarChart';
import { SummaryDataView } from 'components/SummaryDataView/SummaryDataView';

const Summary: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Summary</title>
            </Head>
            <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
                <SummaryView />
            </Secured>
        </>
    );
};

Summary.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
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

    return (
        <>
            <SummarySlider getDate={getDate} />
            <div style={{ overflow: 'auto' }}>
                <BarChart summary={summary} />
                <SummaryDataView summary={summary} />
            </div>
        </>
    );
}
