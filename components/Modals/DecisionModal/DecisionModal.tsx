import { Modal } from 'components/Modal/Modal';
import { FC } from 'react';
import { Action, Button, Container, Title, Typography } from './styles/styles';

interface DecisionModalProps {
    onClose: () => void;
    handleAccept: () => void;
    title: string;
    desc: string;
}

export const DecisionModal: FC<DecisionModalProps> = ({ onClose, handleAccept, title, desc }) => {
    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal onClick={onClose}>
            <Container
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Title>{title}</Title>
                <Typography>{desc}</Typography>
                <Action>
                    <Button onClick={handleCancel}>Nie</Button>
                    <Button onClick={handleAccept}>Tak</Button>
                </Action>
            </Container>
        </Modal>
    );
};
