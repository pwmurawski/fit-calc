import { Container, RegisterLink, Title } from './styles/styles';

export function GoToRegister() {
    return (
        <Container>
            <Title>Nie masz jeszcze konta?</Title>
            <RegisterLink href="/register">Załóż konto</RegisterLink>
        </Container>
    );
}
