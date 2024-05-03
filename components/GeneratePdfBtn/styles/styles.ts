import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.button`
    position: absolute;
    bottom: 50px;
    right: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: rgb(77, 216, 158);
    border-radius: 50%;
    border: 0;
    padding: 0;
    cursor: pointer;
    box-shadow: 0 5px 5px 0 gray;

    :active {
        box-shadow: inset 0 5px 5px 0 gray;
    }
`;

export const PlusIcon = styled.div`
    position: relative;
    width: 30px;
    height: 5px;
    background-color: white;
    border-radius: 20px;

    ::before {
        content: '';
        position: absolute;
        left: 0;
        width: 30px;
        height: 5px;
        background-color: white;
        transform: rotate(90deg);
        border-radius: 20px;
    }
`;
