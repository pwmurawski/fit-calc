import { AddFoodProductModal } from 'components/Modals/AddFoodProductModal/AddFoodProductModal';
import { EditFoodProductModal } from 'components/Modals/EditFoodProductModal/EditFoodProductModal';
import { TableRowId } from 'components/Table/Table';
import { useDeleteFoodProductAdmin } from 'hooks/admin/useDeleteFoodProductAdmin';
import { useBlockedFoodProducts } from 'hooks/admin/useBlockedFoodProducts';
import { useUnBlockedFoodProducts } from 'hooks/admin/useUnBlockedFoodProducts';
import { useUnVerifiedFoodProducts } from 'hooks/admin/useUnVerifiedFoodProducts';
import { useVerifiedFoodProducts } from 'hooks/admin/useVerifiedFoodProducts';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, ButtonContainer } from './styles/styles';

interface AdminFoodTableButtonsProps {
    selectedRowId: TableRowId;
    setSelectedRowId: Dispatch<SetStateAction<TableRowId>>;
    currentPage: number;
    rowsPerPage: number;
    isBlocked: boolean;
}

export const AdminFoodTableButtons: FC<AdminFoodTableButtonsProps> = ({
    selectedRowId,
    setSelectedRowId,
    currentPage,
    rowsPerPage,
    isBlocked,
}) => {
    const [isAddFoodProductModal, setIsAddFoodProductModal] = useState(false);
    const [isEditFoodProductModal, setIsEditFoodProductModal] = useState(false);
    const verified = useVerifiedFoodProducts();
    const unVerified = useUnVerifiedFoodProducts();
    const blocked = useBlockedFoodProducts();
    const unBlocked = useUnBlockedFoodProducts();
    const deleteFoodProduct = useDeleteFoodProductAdmin();

    const handleAddFoodProduct = () => {
        if (!selectedRowId) {
            setIsAddFoodProductModal(true);
        }
    };

    const handleCloseAddFoodProduct = () => {
        setIsAddFoodProductModal(false);
    };

    const handleEditFoodProduct = () => {
        if (selectedRowId) {
            setIsEditFoodProductModal(true);
        }
    };

    const handleCloseEditFoodProduct = () => {
        setIsEditFoodProductModal(false);
    };

    const handleVerified = () => {
        if (selectedRowId) {
            verified({ foodProductId: String(selectedRowId) }, currentPage, rowsPerPage, isBlocked);
        }
    };

    const handleUnVerified = () => {
        if (selectedRowId) {
            unVerified(String(selectedRowId), currentPage, rowsPerPage, isBlocked);
        }
    };

    const handleBlocked = () => {
        if (selectedRowId) {
            blocked({ foodProductId: String(selectedRowId) }, currentPage, rowsPerPage);
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
            {isAddFoodProductModal && (
                <AddFoodProductModal
                    onClose={handleCloseAddFoodProduct}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                />
            )}
            {isEditFoodProductModal && (
                <EditFoodProductModal
                    foodProductId={String(selectedRowId)}
                    isBlocked={isBlocked}
                    onClose={handleCloseEditFoodProduct}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                />
            )}
            <ButtonContainer>
                {!isBlocked && (
                    <Button onClick={handleAddFoodProduct} disabled={!!selectedRowId}>
                        Dodaj
                    </Button>
                )}
                <Button onClick={handleEditFoodProduct} disabled={!selectedRowId}>
                    Edytuj
                </Button>
                <Button onClick={handleVerified} disabled={!selectedRowId}>
                    Zweryfikuj
                </Button>
                <Button onClick={handleUnVerified} disabled={!selectedRowId}>
                    Anuluj weryfikacje
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
        </>
    );
};
