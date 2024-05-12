import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    user-select: none;
`;

export const PageNumber = styled.div<{ $currentPage?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 20px;
    font-size: 13px;
    text-align: center;
    cursor: pointer;
    background-color: ${({ $currentPage }) => ($currentPage ? 'rgb(77, 216, 158)' : 'white')};

    :hover {
        background-color: rgb(77, 216, 158);
    }
`;

export const BtnContainer = styled.div`
    width: 25px;
    height: 25px;
`;

export const ChangePageBtn = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 20px;
    width: 25px;
    height: 25px;
    text-align: center;
    cursor: pointer;

    :hover {
        background-color: rgb(77, 216, 158);
    }
`;
