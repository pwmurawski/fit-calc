import { Secured } from 'components/security/secured';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { AccountType } from 'types/enum';
import { UesrsTable } from 'components/UsersTable/UsersTable';
import { AdminFoodTable } from 'components/AdminFoodTable/AdminFoodTable';
import { AdminLayout } from 'components/Layouts/AdminLayout';

const Admin: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Admin</title>
            </Head>
            <AdminView />
        </>
    );
};

Admin.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Admin]}>
            <AdminLayout>{page}</AdminLayout>
        </Secured>
    );
};

export default Admin;

function AdminView() {
    return (
        <>
            <UesrsTable />
            <AdminFoodTable />
        </>
    );
}
