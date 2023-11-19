import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Container, Logo, Calendar, Logout, LogoutBtn } from './styles/styles';
import { useSelectedDate } from '../../hooks/useSelectedDate';
import { useAuth } from '../../hooks/useAuth';
import LogoutSvg from '../Svg/LogoutSvg';

export default function Header() {
    const { logoutHandler } = useAuth();
    const { date, setDate } = useSelectedDate();
    const { pathname } = useRouter();

    return (
        <Container>
            <Logo>FitCALC</Logo>
            {pathname.includes('login') ? null : (
                <>
                    <Calendar
                        type="date"
                        aria-label="Calendar"
                        value={format(date, 'yyyy-MM-dd')}
                        onChange={(e) => e.target.valueAsDate && setDate(e.target.valueAsDate)}
                    />
                    <Logout>
                        <LogoutBtn
                            onClick={() => {
                                logoutHandler();
                            }}
                        >
                            <LogoutSvg />
                        </LogoutBtn>
                    </Logout>
                </>
            )}
        </Container>
    );
}
