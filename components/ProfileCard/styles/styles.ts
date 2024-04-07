import styled from 'styled-components';

export const Title = styled.h2`
    margin: 20px;
`;

export const Container = styled.section`
    display: flex;
    justify-content: space-between;
    border: 2px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
`;

export const Left = styled.section`
    display: flex;
    align-items: center;
`;

export const Right = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Typography = styled.p`
    margin: 0;
`;

export const DataSection = styled.section`
    padding-left: 20px;
`;

export const FullNameContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const Name = styled.h3`
    margin: 0;
`;

export const UserTypeContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const UserType = styled.div<{ $isAdmin?: boolean }>`
    background-color: ${({ $isAdmin }) => ($isAdmin ? 'rgb(77, 216, 158)' : 'gray')};
    color: white;
    padding: 2px 10px 5px;
    border-radius: 20px;
    font-size: 13px;
`;

export const Button = styled.button<{ $isSelected?: boolean }>`
    background-color: ${({ $isSelected }) => ($isSelected ? 'rgb(77, 216, 158)' : 'white')};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : 'gray')};
    border: ${({ $isSelected }) => ($isSelected ? 'none' : '1px solid gray')};
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
`;

export const Action = styled.section`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: flex-end;
`;
