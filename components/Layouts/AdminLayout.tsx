import { FC } from 'react';
import Header from '../Header/Header';
import { Wrapper, Main } from './styles/styles';

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
