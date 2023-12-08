import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 50%;
    padding: 10px;
    overflow-y: auto;
`;

export const Name = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    max-height: 150px;
    min-height: 50px;
    height: 100%;
    margin: 0;
`;

export const NutritionalVal = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 13px;
    padding: 40px;
    border: 3px solid rgb(77, 216, 158);
`;

export const Kcal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`;

export const Macro = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Weight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: 600;
`;
