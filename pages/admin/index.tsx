import { Secured } from 'components/security/secured';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { AccountType } from 'types/enum';
import { UesrsTable } from 'components/UsersTable/UsersTable';
import { AdminFoodTable } from 'components/AdminFoodTable/AdminFoodTable';
import { AdminLayout } from 'components/Layouts/AdminLayout';
import { useState } from 'react';
import { LayoutChangeBtn } from 'components/LayoutChangeBtn/LayoutChangeBtn';

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
    const [layoutChange, setLayoutChange] = useState<boolean>(false);

    const handleLayoutChange = () => {
        setLayoutChange(!layoutChange);
    };

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'auto',
            }}
        >
            <div style={{ padding: '40px 0 0 10px' }}>
                <LayoutChangeBtn onClick={handleLayoutChange} />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: layoutChange ? 'column' : undefined,
                    width: '100%',
                    height: '100%',
                    padding: '40px 40px 40px 10px',
                    gap: '20px',
                    overflow: 'auto',
                }}
            >
                <div style={{ flex: '1', height: layoutChange ? '50%' : undefined }}>
                    <UesrsTable />
                </div>
                <div style={{ flex: '2', height: layoutChange ? '50%' : undefined }}>
                    <AdminFoodTable />
                </div>
            </div>
        </div>
    );
}
