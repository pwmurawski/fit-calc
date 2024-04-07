import { ResetPasswordModal } from 'components/Modals/ResetPasswordModal/ResetPasswordModal';
import { TableRowId } from 'components/Table/Table';
import { FC, useState } from 'react';

interface UsersTableButtonsProps {
    selectedRowId: TableRowId;
}

export const UsersTableButtons: FC<UsersTableButtonsProps> = ({ selectedRowId }) => {
    const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

    const openResetPassword = () => {
        if (selectedRowId) {
            setIsResetPassword(true);
        }
    };

    const onCloseResetPassword = () => {
        setIsResetPassword(false);
    };

    return (
        <>
            <section style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid gray' }}>
                <button disabled={!selectedRowId} onClick={openResetPassword}>
                    Resetuj hasło
                </button>
                <button>Zablokuj</button>
                <button>Usuń</button>
            </section>
            {isResetPassword && <ResetPasswordModal onClose={onCloseResetPassword} selectedRowId={selectedRowId} />}
        </>
    );
};
