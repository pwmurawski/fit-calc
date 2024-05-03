import { useRouter } from 'next/router';
import { FC } from 'react';
import NavbarDailyGoalsAndSummary from '../NavbarDailyGoalsAndSummary/NavbarDailyGoalsAndSummary';
import SearchBar from '../SearchBar/SearchBar';
import { Container, Wrapper, Main } from './styles/styles';
import Header from 'components/Headers/Header/Header';
import HeaderFoodProducts from 'components/Headers/HeaderFoodProducts/HeaderFoodProducts';

export interface LayoutProps extends React.PropsWithChildren {
    protectedPage?: true;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();

    const headers = [{ path: ['/', '/app', '/admin'], component: <Header /> }];
    const components = [
        {
            path: ['/foodProducts', '/foodProducts/search'],
            component: <SearchBar />,
        },
        {
            path: ['/dailyGoals', '/summary'],
            component: <NavbarDailyGoalsAndSummary />,
        },
    ];

    const active = {
        headers: headers.find((layout) => layout.path.includes(pathname)),
        components: components.find((layout) => layout.path.includes(pathname)),
    };

    return (
        <Wrapper>
            {active.headers ? active.headers.component : <HeaderFoodProducts />}
            <Container>
                {active.components ? active.components.component : null}
                <Main>{children}</Main>
            </Container>
        </Wrapper>
    );
};
