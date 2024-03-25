import { FoodProductForm } from 'components/Forms/FoodProductForm/FoodProductForm';
import { Modal } from 'components/Modal/Modal';
import { Container, Title } from './styles/styles';
import { FC } from 'react';
import { BodyFoodProducts } from 'types/FoodProduct';
import useEditFoodProductAdmin from 'hooks/admin/useEditFoodProductAdmin';

interface EditFoodProductModalProps {
    onClose?: () => void;
    foodProductId: string;
    isBlocked: boolean;
}

export const EditFoodProductModal: FC<EditFoodProductModalProps> = ({ onClose, foodProductId, isBlocked }) => {
    const foodProduct = useEditFoodProductAdmin(foodProductId, isBlocked);

    const handleSubmit = (data: BodyFoodProducts) => {
        foodProduct?.edit(data);
        onClose?.();
    };

    return (
        <Modal onClick={onClose}>
            <Container
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Title>Edytuj Produkt</Title>
                <FoodProductForm defaultValue={foodProduct?.defaultValue} submit={handleSubmit} />
            </Container>
        </Modal>
    );
};
