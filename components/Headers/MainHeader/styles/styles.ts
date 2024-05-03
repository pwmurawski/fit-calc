import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    box-shadow: 0 0 15px #ced0d0;
`;

export const Logo = styled.h1`
    font-size: 22px;
    height: 30px;
    margin: 0;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
        sans-serif;
`;

export const RightContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export const Button = styled.button`
    background-color: transparent;
    width: 25px;
    height: 25px;
    border: 0;
    padding: 0;
    cursor: pointer;
`;

export const LinkStyled = styled(Link)`
    background-color: transparent;
    width: 25px;
    height: 25px;
    border: 0;
    padding: 0;
    cursor: pointer;
`;

export const Calendar = styled.input`
    border: 0;
    padding: 0 5px;
    width: 120px;
    font-size: 15px;
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
        sans-serif;
    cursor: pointer;
`;
