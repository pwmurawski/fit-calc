import { FC } from 'react';
import { Container, PlusIcon } from './styles/styles';

interface GeneratePdfBtnProps {
    onClick: () => void;
}

export const GeneratePdfBtn: FC<GeneratePdfBtnProps> = ({ onClick }) => {
    return (
        <Container onClick={onClick} aria-label="Generate pdf">
            <PlusIcon />
        </Container>
    );
};
