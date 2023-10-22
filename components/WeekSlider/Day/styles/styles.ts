import styled, { css } from 'styled-components';

interface IContainer {
    currentDay?: boolean;
    selectedDay?: boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    margin: 0 5px;

    @media (max-width: 425px) {
        margin: 0 1.5px;
    }

    ${({ currentDay }: IContainer) =>
        currentDay &&
        css`
            background-color: rgb(210, 255, 242);
            color: green;
        `}

    ${({ selectedDay }: IContainer) =>
        selectedDay &&
        css`
            border: 2px solid rgb(170, 215, 202);
            color: green;
        `}
`;

export const Number = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35%;
    margin: 0;
    font-size: 19px;
`;

export const Name = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: 35%;
`;
