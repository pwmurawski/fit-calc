import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Title = styled.h3``;

export const RegisterLink = styled(Link)`
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    max-width: 180px;
    width: 50%;
    height: 30px;
    margin: 10px 0;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    color: rgb(77, 216, 158);
    border: 1px solid rgb(77, 216, 158);
    background-color: whitesmoke;
    cursor: pointer;
`;
