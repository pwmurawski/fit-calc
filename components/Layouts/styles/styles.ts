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
    background-color: white;
`;

export const Main = styled.main`
    ${commonStyles};
`;
