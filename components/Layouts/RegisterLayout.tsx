import { useRouter } from 'next/router';
import { FC } from 'react';
import Header from '../Header/Header';
import HeaderFoodProducts from '../HeaderFoodProducts/HeaderFoodProducts';
import { Container, Wrapper, Main } from './styles/styles';

export interface RegisterLayoutProps extends React.PropsWithChildren {
    protectedPage?: true;
}

export const RegisterLayout: FC<RegisterLayoutProps> = ({ children }) => {
    const { pathname } = useRouter();

    const headers = [
        { path: ['/login'], component: <Header /> },
        { path: ['/register'], component: <HeaderFoodProducts href="/login" /> },
    ];

    const active = {
        headers: headers.find(({ path }) => path.includes(pathname)),
    };

    return (
        <Wrapper>
            <Container>
                {active.headers && active.headers.component}
                <Main>{children}</Main>
            </Container>
        </Wrapper>
    );
};
