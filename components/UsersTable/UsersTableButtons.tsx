import { TableRowId } from 'components/Table/Table';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, ButtonContainer } from './styles/styles';
import { ResetPasswordModal } from 'components/Modals/ResetPasswordModal/ResetPasswordModal';
import { useBlockedUsers } from 'hooks/admin/useBlockedUsers';
import { useUnBlockedUsers } from 'hooks/admin/useUnBlockedUsers';
import { useDeleteUserAdmin } from 'hooks/admin/useDeleteUserAdmin';

interface UsersTableButtonsProps {
    selectedRowId: TableRowId;
    setSelectedRowId: Dispatch<SetStateAction<TableRowId>>;
    currentPage: number;
    rowsPerPage: number;
    isBlocked: boolean;
}

export const UsersTableButtons: FC<UsersTableButtonsProps> = ({
    selectedRowId,
    setSelectedRowId,
    currentPage,
    rowsPerPage,
    isBlocked,
}) => {
    const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
    const blocked = useBlockedUsers();
    const unBlocked = useUnBlockedUsers();
    const deleteFoodProduct = useDeleteUserAdmin();

    const openResetPassword = () => {
        if (selectedRowId) {
            setIsResetPassword(true);
        }
    };

    const onCloseResetPassword = () => {
        setIsResetPassword(false);
    };

    const handleBlocked = () => {
        if (selectedRowId) {
            blocked({ userId: String(selectedRowId) }, currentPage, rowsPerPage);
            setSelectedRowId(undefined);
        }
    };

    const handleUnBlocked = () => {
        if (selectedRowId) {
            unBlocked(String(selectedRowId), currentPage, rowsPerPage);
        }
    };

    const handleDelete = () => {
        if (selectedRowId) {
            deleteFoodProduct(String(selectedRowId), currentPage, rowsPerPage);
            setSelectedRowId(undefined);
        }
    };

    return (
        <>
            <ButtonContainer>
                <Button disabled={!selectedRowId} onClick={openResetPassword}>
                    Resetuj hasło
                </Button>
                {!isBlocked ? (
                    <Button onClick={handleBlocked} disabled={!selectedRowId}>
                        Zablokuj
                    </Button>
                ) : (
                    <Button onClick={handleUnBlocked} disabled={!selectedRowId}>
                        Przywróć
                    </Button>
                )}
                {isBlocked && (
                    <Button onClick={handleDelete} disabled={!selectedRowId}>
                        Usuń
                    </Button>
                )}
            </ButtonContainer>
            {isResetPassword && <ResetPasswordModal onClose={onCloseResetPassword} selectedRowId={selectedRowId} />}
        </>
    );
};
