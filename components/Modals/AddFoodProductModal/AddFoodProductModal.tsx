import { FoodProductForm } from 'components/Forms/FoodProductForm/FoodProductForm';
import { Modal } from 'components/Modal/Modal';
import { Container, Title } from './styles/styles';
import { FC } from 'react';
import { useAddFoodProductAdmin } from 'hooks/admin/useAddFoodProductAdmin';
import { BodyFoodProducts } from 'types/FoodProduct';

interface AddFoodProductModalProps {
    onClose?: () => void;
}

export const AddFoodProductModal: FC<AddFoodProductModalProps> = ({ onClose }) => {
    const addFoodProduct = useAddFoodProductAdmin();

    const handleSubmit = (data: BodyFoodProducts) => {
        addFoodProduct(data);
        onClose?.();
    };

    return (
        <Modal onClick={onClose}>
            <Container
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Title>Dodaj Produkt</Title>
                <FoodProductForm submit={handleSubmit} />
            </Container>
        </Modal>
    );
};
