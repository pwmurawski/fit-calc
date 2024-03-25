import { FC, MouseEventHandler, ReactElement } from 'react';
import { Container } from './styles/styles';

interface ModalProps {
    children: ReactElement;
    onClick?: MouseEventHandler<HTMLElement> | undefined;
}

export const Modal: FC<ModalProps> = ({ children, onClick }) => {
    return <Container onClick={onClick}>{children}</Container>;
};
