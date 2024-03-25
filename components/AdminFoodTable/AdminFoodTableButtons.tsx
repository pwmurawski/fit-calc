import { AddFoodProductModal } from 'components/Modals/AddFoodProductModal/AddFoodProductModal';
import { EditFoodProductModal } from 'components/Modals/EditFoodProductModal/EditFoodProductModal';
import { TableRowId } from 'components/Table/Table';
import { useDeleteFoodProductAdmin } from 'hooks/admin/useDeleteFoodProductAdmin';
import { useBlockedFoodProducts } from 'hooks/admin/useBlockedFoodProducts';
import { useUnBlockedFoodProducts } from 'hooks/admin/useUnBlockedFoodProducts';
import { useUnVerifiedFoodProducts } from 'hooks/admin/useUnVerifiedFoodProducts';
import { useVerifiedFoodProducts } from 'hooks/admin/useVerifiedFoodProducts';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface AdminFoodTableButtonsProps {
    selectedRowId: TableRowId;
    setSelectedRowId: Dispatch<SetStateAction<TableRowId>>;
    isBlocked: boolean;
}

export const AdminFoodTableButtons: FC<AdminFoodTableButtonsProps> = ({
    selectedRowId,
    setSelectedRowId,
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
            verified({ foodProductId: String(selectedRowId) }, isBlocked);
        }
    };

    const handleUnVerified = () => {
        if (selectedRowId) {
            unVerified(String(selectedRowId), isBlocked);
        }
    };

    const handleBlocked = () => {
        if (selectedRowId) {
            blocked({ foodProductId: String(selectedRowId) });
            setSelectedRowId(undefined);
        }
    };

    const handleUnBlocked = () => {
        if (selectedRowId) {
            unBlocked(String(selectedRowId));
        }
    };

    const handleDelete = () => {
        if (selectedRowId) {
            deleteFoodProduct(String(selectedRowId));
        }
    };

    return (
        <>
            {isAddFoodProductModal && <AddFoodProductModal onClose={handleCloseAddFoodProduct} />}
            {isEditFoodProductModal && (
                <EditFoodProductModal
                    foodProductId={String(selectedRowId)}
                    isBlocked={isBlocked}
                    onClose={handleCloseEditFoodProduct}
                />
            )}
            <section style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid gray' }}>
                {!isBlocked && (
                    <button onClick={handleAddFoodProduct} disabled={!!selectedRowId}>
                        Dodaj
                    </button>
                )}
                <button onClick={handleEditFoodProduct} disabled={!selectedRowId}>
                    Edytuj
                </button>
                <button onClick={handleVerified} disabled={!selectedRowId}>
                    Zweryfikuj
                </button>
                <button onClick={handleUnVerified} disabled={!selectedRowId}>
                    Anuluj weryfikacje
                </button>
                {!isBlocked ? (
                    <button onClick={handleBlocked} disabled={!selectedRowId}>
                        Zablokuj
                    </button>
                ) : (
                    <button onClick={handleUnBlocked} disabled={!selectedRowId}>
                        Przywróć
                    </button>
                )}
                {isBlocked && (
                    <button onClick={handleDelete} disabled={!selectedRowId}>
                        Usuń
                    </button>
                )}
            </section>
        </>
    );
};
