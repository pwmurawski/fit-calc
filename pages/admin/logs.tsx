import { Secured } from 'components/security/secured';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { AccountType } from 'types/enum';
import { AdminLayout } from 'components/Layouts/AdminLayout';
import { LogsTable } from 'components/LogsTable/LogsTable';

const Logs: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Rejestr logowań</title>
            </Head>
            <LogsView />
        </>
    );
};

Logs.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Admin]}>
            <AdminLayout>{page}</AdminLayout>
        </Secured>
    );
};

export default Logs;

function LogsView() {
    return <LogsTable />;
}
