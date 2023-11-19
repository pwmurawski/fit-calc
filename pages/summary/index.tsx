import { Layout } from 'components/Layouts/Layout';
import { Secured } from 'components/security/secured';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { AccountType } from 'types/enum';

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
    return <div>Summary</div>;
}
