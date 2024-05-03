import { useRouter } from 'next/router';
import { Container, Logo, Button, RightContainer, LinkStyled } from './styles/styles';
import { useAuth } from '../../../hooks/useAuth';
import LogoutSvg from '../../Svg/LogoutSvg';
import ProfileSvg from 'components/Svg/ProfileSvg';
import Link from 'next/link';

export default function MainHeader() {
    const { session, logoutHandler } = useAuth();
    const { pathname } = useRouter();

    return (
        <Container>
            <Link href="/">
                <Logo>FitCALC</Logo>
            </Link>
            {pathname.includes('login') ? null : (
                <RightContainer>
                    {session.status === 'authenticated' ? (
                        <>
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
                        </>
                    ) : (
                        <LinkStyled href="/login">
                            <ProfileSvg />
                        </LinkStyled>
                    )}
                </RightContainer>
            )}
        </Container>
    );
}
