import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const Title = styled.h2`
    margin: 20px;
`;

export const HeaderButtonContainer = styled.section`
    display: flex;
    padding: 5px;
`;

export const ButtonContainer = styled.section`
    display: flex;
    justify-content: flex-end;
`;

export const Button = styled.button<{ $color?: string }>`
    border: 1px solid gray;
    appearance: none;
    max-width: 150px;
    padding: 0 15px;
    height: 25px;
    cursor: pointer;
    background-color: ${({ $color }) => $color ?? 'rgb(77, 216, 158)'};

    :first-of-type {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    :last-of-type {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    :nth-of-type(2n) {
        border-left: none;
        border-right: none;
    }
    :disabled {
        background-color: whitesmoke;
    }
`;
