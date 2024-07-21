import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(66, 68, 90, 1);
    padding: 30px;
    overflow: auto;
`;

export const Title = styled.h3`
    margin: 0;
`;

export const Typography = styled.p``;

export const Action = styled.section`
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
