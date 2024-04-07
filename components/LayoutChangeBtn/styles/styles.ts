import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 0;
    padding: 5px;
    cursor: pointer;
    box-shadow: 0 5px 5px 0 gray;

    :active {
        box-shadow: inset 0 5px 5px 0 gray;
    }
`;
