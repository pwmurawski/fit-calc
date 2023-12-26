import styled from 'styled-components';

export const RangesContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
`;

export const RangesBtn = styled.section<{ $isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 30px;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${({ $isActive }) => $isActive && 'rgb(77, 216, 158)'};
    border: ${({ $isActive }) => $isActive && '1px solid rgb(77, 216, 158)'};
`;

export const DateContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    gap: 10px;
`;

export const DateBtn = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
`;

export const DateSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: whitesmoke;
    border-radius: 20px;
    h2 {
        margin: 0;
        font-size: 22px;
    }
`;
