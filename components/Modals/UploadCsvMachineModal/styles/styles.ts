import styled from 'styled-components';

export const Container = styled.section<{ $maxWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    max-width: ${({ $maxWidth }) => ($maxWidth ? '500px' : 'none')};
    width: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(66, 68, 90, 1);
    overflow: auto;
`;

export const Title = styled.h2`
    margin: 20px;
`;

export const ActionContainer = styled.section`
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
        border-left: none;
    }
    :disabled {
        background-color: whitesmoke;
    }
`;
