import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled(Link)`
    display: flex;
    flex-direction: column;
    width: 97%;
    background-color: whitesmoke;
    margin-bottom: 5px;
    padding: 18px;
    border-radius: 5px;
    cursor: pointer;
`;

export const FoodContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3px;

    @media (max-width: 405px) {
        flex-direction: column;
        align-items: flex-end;
    }
`;

export const FoodMacro = styled.div`
    display: felx;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
    padding: 0;
    font-size: 13px;
    font-weight: 600;
    white-space: normal;
`;

export const DeleteBtn = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;

    ::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: black;
        transform: rotate(-45deg);
    }

    ::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: black;
        transform: rotate(45deg);
    }
`;

export const Top = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Name = styled.h2`
    margin: 0;
    font-size: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const Value = styled.span`
    font-weight: 400;
    color: green;
    align-self: flex-start;
`;
