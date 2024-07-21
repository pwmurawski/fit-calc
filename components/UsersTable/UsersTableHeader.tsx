import { Dispatch, FC, SetStateAction } from 'react';
import { Button, Container, HeaderButtonContainer, Title } from './styles/styles';

interface UsersTableHeaderProps {
    isBlocked: boolean;
    setIsBlocked: Dispatch<SetStateAction<boolean>>;
}

export const UsersTableHeader: FC<UsersTableHeaderProps> = ({ isBlocked, setIsBlocked }) => {
    const handleArchive = () => {
        setIsBlocked(!isBlocked);
    };

    return (
        <Container>
            <Title>{!isBlocked ? 'Użytkownicy' : 'Użytkownicy - Archiwum'}</Title>
            <HeaderButtonContainer>
                <Button onClick={handleArchive}>{!isBlocked ? 'Archiwum' : 'Aktywne'}</Button>
            </HeaderButtonContainer>
        </Container>
    );
};
