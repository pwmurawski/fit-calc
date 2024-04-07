import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled(Link)`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
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

    @media (max-width: 374px) {
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

export const Weight = styled.div<{ $isLastSelectedProduct?: boolean }>`
    display: flex;
    justify-content: ${({ $isLastSelectedProduct }) => ($isLastSelectedProduct ? 'space-between' : 'flex-end')};
    align-items: center;
    width: 100%;
    height: fit-content;
    font-size: 16px;
    gap: 5px;
`;

export const LastSelectedProduct = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    margin-top: 5px;
    padding: 2px 10px;
    font-size: 13px;
    border-radius: 10px;
    background-color: rgb(77, 216, 158);
    gap: 5px;
`;

export const PlusIcon = styled.div`
    position: relative;
    width: 10px;
    height: 2px;
    background-color: white;
    border-radius: 20px;

    ::before {
        content: '';
        position: absolute;
        left: 0;
        width: 10px;
        height: 2px;
        background-color: white;
        transform: rotate(90deg);
        border-radius: 20px;
    }
`;

export const Verified = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
`;
