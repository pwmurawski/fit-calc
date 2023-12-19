import { useRouter } from 'next/router';
import { FC } from 'react';
import Header from '../Header/Header';
import HeaderFoodProducts from '../HeaderFoodProducts/HeaderFoodProducts';
import NavbarDailyGoalsAndSummary from '../NavbarDailyGoalsAndSummary/NavbarDailyGoalsAndSummary';
import SearchBar from '../SearchBar/SearchBar';
import { Container, Wrapper, Main } from './styles/styles';

export interface LayoutProps extends React.PropsWithChildren {
    protectedPage?: true;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();

    const headers = [{ path: ['/'], component: <Header /> }];
    const components = [
        {
            path: ['/foodProducts', '/foodProducts/search'],
            component: <SearchBar />,
        },
        {
            path: ['/dailyGoals', '/summary/day', '/summary/week', '/summary/month', '/summary/year'],
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
