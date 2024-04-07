import { FC } from 'react';
import { DecisionModal } from '../DecisionModal/DecisionModal';
import { TableRowId } from 'components/Table/Table';
import { useDeleteFoodProduct } from 'hooks/useDeleteFoodProduct';

interface DeleteFoodProductModalProps {
    onClose: () => void;
    productId: TableRowId;
}

export const DeleteFoodProductModal: FC<DeleteFoodProductModalProps> = ({ onClose, productId }) => {
    const deleteHandler = useDeleteFoodProduct();

    const handleCancel = () => {
        onClose();
    };

    const handleAccept = async () => {
        await deleteHandler(String(productId));
        onClose();
    };

    return (
        <DecisionModal
            title="Usuń produkt"
            desc="Czy napewno chcesz usunąć produkt?"
            handleAccept={handleAccept}
            onClose={handleCancel}
        />
    );
};
