import styled from 'styled-components';

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 1140px;
    width: 100%;
`;

export const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 70px;
    gap: 70px;
    background-color: #f7f9f9;

    @media (max-width: 767px) {
        flex-direction: column;
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
    text-align: center;

    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 767px) {
        max-width: 200px;
    }
`;

export const Title = styled.h3`
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin: 100px 0;

    @media (max-width: 992px) {
        font-size: 18px;
    }
`;

export const ImageTitle = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin: 0 20px;
`;
