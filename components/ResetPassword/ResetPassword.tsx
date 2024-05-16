import { Container, RegisterLink } from './styles/styles';

export function ResetPassword() {
    return (
        <Container>
            <RegisterLink href="/reset-password">Nie pamiętasz hasła?</RegisterLink>
        </Container>
    );
}
