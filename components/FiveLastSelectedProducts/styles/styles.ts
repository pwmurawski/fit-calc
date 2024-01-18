import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const LastSelectedProduct = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    color: white;
    background-color: black;
    background-color: rgb(77, 216, 158);
    :first-of-type {
        margin-top: 5px;
    }
`;

export const SubmitBtn = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid white;
    border-radius: 50%;
    max-width: 30px;
    max-height: 30px;
    min-width: 30px;
    min-height: 30px;
    cursor: pointer;
    background-color: transparent;

    ::before {
        content: '';
        position: absolute;
        bottom: 9px;
        left: 8.5px;
        width: 10px;
        height: 2px;
        background-color: white;
        border-radius: 15px;
        transform: rotate(-45deg);
    }

    ::after {
        content: '';
        position: absolute;
        top: 9px;
        left: 8.5px;
        width: 10px;
        height: 2px;
        background-color: white;
        border-radius: 15px;
        transform: rotate(45deg);
    }
`;
