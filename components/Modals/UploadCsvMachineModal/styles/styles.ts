import styled from 'styled-components';

export const Container = styled.section<{ $maxWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    max-width: ${({ $maxWidth }) => ($maxWidth ? '500px' : 'none')};
    width: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 10px 0 rgba(66, 68, 90, 1);
    overflow: auto;
`;

export const Title = styled.h2`
    margin: 20px;
`;

export const ActionContainer = styled.section`
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid gray;
`;

export const Button = styled.button``;
