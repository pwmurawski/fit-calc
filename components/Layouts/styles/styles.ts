import Link from 'next/link';
import styled, { CSSObject } from 'styled-components';

const commonStyles: CSSObject = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

export const Container = styled.section`
    ${commonStyles};
    max-width: 1000px;
`;

export const Main = styled.main`
    ${commonStyles};
    overflow-y: auto;
`;

export const AdminWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
    overflow: auto;
`;

export const AdminMain = styled.main`
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

export const AdminContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 40px;
    gap: 20px;
    overflow: auto;

    @media (min-width: 1200px) {
        flex-direction: row;
    }
`;

export const Menu = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 200px;
    width: 100%;
    gap: 10px;
`;

export const MenuLink = styled(Link)`
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;
    padding: 0 10px;
    gap: 10px;
`;
