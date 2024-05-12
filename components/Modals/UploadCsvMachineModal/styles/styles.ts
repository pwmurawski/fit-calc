import styled from 'styled-components';

export const Container = styled.section<{ $maxWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    max-width: ${({ $maxWidth }) => ($maxWidth ? '500px' : 'none')};
    width: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(66, 68, 90, 1);
    overflow: auto;
`;

export const Title = styled.h2`
    margin: 20px;
`;

export const ActionContainer = styled.section`
    display: flex;
    justify-content: flex-end;
`;

export const Button = styled.button``;
