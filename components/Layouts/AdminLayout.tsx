import { FC } from 'react';
import { Wrapper, Main, AdminWrapper, AdminContainer, Menu, MenuLink, AdminMain } from './styles/styles';
import Header from 'components/Headers/Header/Header';
import ProductSvg from 'components/Svg/ProductSvg';
import UsersSvg from 'components/Svg/UsersSvg';
import LogSvg from 'components/Svg/LogSvg';

export interface LayoutProps extends React.PropsWithChildren {
    protectedPage?: true;
}

export const AdminLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <AdminMain>
                <Menu>
                    <MenuLink href="/admin/users">
                        <UsersSvg />
                        Użytkownicy
                    </MenuLink>
                    <MenuLink href="/admin/foodProducts">
                        <ProductSvg />
                        Produkty
                    </MenuLink>
                    <MenuLink href="/admin/logs">
                        <LogSvg />
                        Logs
                    </MenuLink>
                </Menu>
                <AdminWrapper>
                    <AdminContainer>{children}</AdminContainer>
                </AdminWrapper>
            </AdminMain>
        </Wrapper>
    );
};
