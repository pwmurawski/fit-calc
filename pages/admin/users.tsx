import { Secured } from 'components/security/secured';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { AccountType } from 'types/enum';
import { UesrsTable } from 'components/UsersTable/UsersTable';
import { AdminLayout } from 'components/Layouts/AdminLayout';

const Users: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Użytkownicy</title>
            </Head>
            <UsersView />
        </>
    );
};

Users.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Admin]}>
            <AdminLayout>{page}</AdminLayout>
        </Secured>
    );
};

export default Users;

function UsersView() {
    return <UesrsTable />;
}
