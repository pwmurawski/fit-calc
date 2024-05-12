import styled from 'styled-components';

export const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 100px;
    padding: 100px;

    @media (max-width: 767px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;

    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 767px) {
        width: 100%;
        max-height: 350px;
        img {
            width: auto;
            height: 100%;
        }
    }
`;

export const Title = styled.h2`
    max-width: 500px;
    width: 100%;
    font-size: 60px;
    font-weight: 400;
    margin: 0;
    text-align: right;

    @media (max-width: 992px) {
        font-size: 40px;
    }

    @media (max-width: 767px) {
        gap: 20px;
        text-align: center;
    }
`;
