import { ChangePasswordForm } from 'components/Forms/ChangePasswordForm/ChangePasswordForm';
import { EditUserForm } from 'components/Forms/EditUserForm/EditUserForm';
import { Layout } from 'components/Layouts/Layout';
import { ProfileCard } from 'components/ProfileCard/ProfileCard';
import { Secured } from 'components/security/secured';
import { useUpdateUser } from 'hooks/useUpdateUser';
import { useUser } from 'hooks/useUser';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { useState } from 'react';
import { AccountType } from 'types/enum';

const Profile: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Profile</title>
            </Head>
            <ProfileView />
        </>
    );
};

Profile.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default Profile;

export function ProfileView() {
    const data = useUser();
    const { update, changePassword } = useUpdateUser();
    const [isEdit, setIsEdit] = useState<boolean>(true);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

    const onClickEditBtn = () => {
        setIsEdit(true);
        setIsChangePassword(false);
    };

    const onClickChangePasswordBtn = () => {
        setIsChangePassword(true);
        setIsEdit(false);
    };

    return (
        <>
            <ProfileCard
                userData={data?.user}
                isEdit={isEdit}
                isChangePassword={isChangePassword}
                onClickEditBtn={onClickEditBtn}
                onClickChangePasswordBtn={onClickChangePasswordBtn}
            />
            {isEdit && (
                <EditUserForm
                    defaultValue={{
                        email: data?.user.email ?? '',
                        name: data?.user.name ?? '',
                        surname: data?.user.surname ?? '',
                    }}
                    submit={update}
                />
            )}
            {isChangePassword && <ChangePasswordForm submit={changePassword} />}
        </>
    );
}
