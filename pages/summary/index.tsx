import { Layout } from 'components/Layouts/Layout';
import { Secured } from 'components/security/secured';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { AccountType } from 'types/enum';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSummaryByDateRange } from 'hooks/useSummaryByDateRange';
import { useState } from 'react';
import { format } from 'date-fns';
import { SummarySlider } from 'components/SummarySlider/SummarySlider';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [1, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [1, 2, 3],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export function SummaryView() {
    const [date, setDate] = useState({
        start: new Date(),
        end: new Date(),
    });
    const da = useSummaryByDateRange(format(date.start, 'yyyy-MM-dd'), format(date.end, 'yyyy-MM-dd'));
    console.log(da);

    const getDate = (start: Date, end: Date) => {
        setDate({ start, end });
    };

    return (
        <>
            <SummarySlider getDate={getDate} />
            <Bar options={options} data={data} />
        </>
    );
}
