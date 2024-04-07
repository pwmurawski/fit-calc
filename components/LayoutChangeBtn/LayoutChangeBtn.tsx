import { FC, MouseEventHandler } from 'react';
import { Container } from './styles/styles';
import { LayoutChangeIcon } from 'components/Svg/LayoutChangeIcon';
interface LayoutChangeBtnProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const LayoutChangeBtn: FC<LayoutChangeBtnProps> = ({ onClick }) => {
    return (
        <Container onClick={onClick}>
            <LayoutChangeIcon />
        </Container>
    );
};
