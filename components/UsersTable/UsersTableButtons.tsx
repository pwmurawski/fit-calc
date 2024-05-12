import { ResetPasswordModal } from 'components/Modals/ResetPasswordModal/ResetPasswordModal';
import { TableRowId } from 'components/Table/Table';
import { FC, useState } from 'react';
import { Button, ButtonContainer } from './styles/styles';

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
            <ButtonContainer>
                <Button disabled={!selectedRowId} onClick={openResetPassword}>
                    Resetuj hasło
                </Button>
                <Button>Zablokuj</Button>
                <Button>Usuń</Button>
            </ButtonContainer>
            {isResetPassword && <ResetPasswordModal onClose={onCloseResetPassword} selectedRowId={selectedRowId} />}
        </>
    );
};
