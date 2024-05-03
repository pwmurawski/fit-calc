import { FC } from 'react';
import { Wrapper, Main } from './styles/styles';
import Header from 'components/Headers/Header/Header';

export interface LayoutProps extends React.PropsWithChildren {
    protectedPage?: true;
}

export const AdminLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <Main>{children}</Main>
        </Wrapper>
    );
};
