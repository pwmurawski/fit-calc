import styled from 'styled-components';

export const Title = styled.h2``;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 50px;
`;

export const SubmitBtn = styled.button<{ isError?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 180px;
    width: 50%;
    height: 30px;
    margin: 10px 0;
    border-radius: 10px;
    font-weight: 600;
    color: ${({ isError }) => (isError ? 'black' : 'white')};
    border: ${({ isError }) => (isError ? '1px solid lightgray' : '0')};
    background-color: ${({ isError }) => (isError ? 'white' : 'rgb(77, 216, 158)')};
    cursor: ${({ isError }) => (isError ? 'default' : 'pointer')};
`;
