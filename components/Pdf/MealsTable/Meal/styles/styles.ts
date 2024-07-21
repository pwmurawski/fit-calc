import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-height: 100px;
    height: 100%;
    margin: 5px 0;
    padding: 18px;
    border-radius: 15px;
    background-color: ${({ backgroundColor }: { backgroundColor?: string }) => backgroundColor ?? 'rgb(210,255,242)'};
    cursor: pointer;
`;

export const Top = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Bottom = styled.div`
    display: flex;
`;

export const Name = styled.h3`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    font-size: 18px;
    white-space: nowrap;
`;

export const Kcal = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 65%;
    padding: 0 5px;
`;

export const Macro = styled.div`
    display: felx;
    justify-content: flex-start;
    align-items: center;
    min-width: fit-content;
    width: 20%;
    margin: 0 8px 0 0;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
`;

export const Value = styled.span`
    font-weight: 400;
    color: green;
`;

export const AddLink = styled(Link)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(77, 216, 158);
    border-radius: 50%;
    min-width: 35px;
    min-height: 35px;
    max-width: 35px;
    max-height: 35px;
    cursor: pointer;

    ::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 3px;
        border-radius: 10px;
        background-color: white;
    }

    ::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 3px;
        border-radius: 10px;
        background-color: white;
        transform: rotate(90deg);
    }
`;
