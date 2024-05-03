import { FC } from 'react';
import { Wrapper, Main } from './styles/styles';
import MainHeader from 'components/Headers/MainHeader/MainHeader';

export interface MainLayoutProps extends React.PropsWithChildren {
    protectedPage?: true;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <Wrapper>
            <MainHeader />
            <Main>{children}</Main>
        </Wrapper>
    );
};
