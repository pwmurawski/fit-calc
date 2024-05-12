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
