import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Container, Logo, Calendar, Button, RightContainer, LinkStyled } from './styles/styles';
import { useSelectedDate } from '../../../hooks/useSelectedDate';
import { useAuth } from '../../../hooks/useAuth';
import LogoutSvg from '../../Svg/LogoutSvg';
import ProfileSvg from 'components/Svg/ProfileSvg';
import Link from 'next/link';

export default function Header() {
    const { session, logoutHandler } = useAuth();
    const { date, setDate } = useSelectedDate();
    const { pathname } = useRouter();

    return (
        <Container>
            <Link href="/">
                <Logo>FitCALC</Logo>
            </Link>
            {pathname.includes('login') ? null : (
                <>
                    <Calendar
                        type="date"
                        aria-label="Calendar"
                        value={format(date, 'yyyy-MM-dd')}
                        onChange={(e) => e.target.valueAsDate && setDate(e.target.valueAsDate)}
                    />
                    <RightContainer>
                        <LinkStyled href="/user/profile">
                            <ProfileSvg />
                        </LinkStyled>
                        <Button
                            onClick={() => {
                                logoutHandler();
                            }}
                        >
                            <LogoutSvg />
                        </Button>
                    </RightContainer>
                </>
            )}
        </Container>
    );
}
