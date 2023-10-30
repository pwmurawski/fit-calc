import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    gap: 10px;
`;

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 35px;
    gap: 5px;
`;

export const Label = styled.label``;

export const Input = styled.input<{ isError?: boolean }>`
    width: 60px;
    height: 100%;
    border: 1px solid ${({ isError }) => (isError ? 'red' : 'lightgray')};
    border-radius: 5px;
    color: ${({ isError }) => (isError ? 'red' : 'black')};
    text-align: end;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: textfield;
    }
`;

export const Unit = styled.p`
    margin: 0;
    padding-right: 15px;
`;

export const UnitKcal = styled(Unit)`
    padding-right: 0;
`;

export const SubmitBtn = styled.button`
    align-self: flex-end;
    font-size: 16px;
    font-weight: 600;
    text-align: end;
    color: rgb(100, 180, 255);
    background-color: transparent;
    height: 30px;
    margin: 0 0 15px 0;
    padding: 0;
    border: 0;
    cursor: pointer;
`;
