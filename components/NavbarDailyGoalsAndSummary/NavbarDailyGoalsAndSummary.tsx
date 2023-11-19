import { useRouter } from 'next/router';
import { Container, LinkStyled } from './styles/styles';

export default function NavbarDailyGoalsAndSummary() {
    const { pathname } = useRouter();

    return (
        <Container>
            <LinkStyled href="/dailyGoals" isActive={pathname.includes('dailyGoals')}>
                Cele dnia
            </LinkStyled>
            <LinkStyled href="/summary" isActive={pathname.includes('summary')}>
                Podsumowanie
            </LinkStyled>
        </Container>
    );
}
