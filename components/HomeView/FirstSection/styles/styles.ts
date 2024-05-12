import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
    padding: 40px;
    max-width: 1600px;
    width: 100%;
    height: 680px;
    background-image: url('./assets/1.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    object-position: center;

    @media (max-width: 767px) {
        flex-direction: column;
        gap: 20px;
        height: auto;
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 100%;

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

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 620px;
    width: 100%;
    height: 100%;
    gap: 20px;
`;

export const TextContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap: 20px;

    @media (max-width: 767px) {
        text-align: center;
    }
`;

export const Title = styled.h2`
    font-size: 60px;
    font-weight: 400;
    margin: 0;

    @media (max-width: 992px) {
        font-size: 40px;
    }
`;
export const Typography = styled.p`
    font-size: 24px;
    font-weight: 400;
    margin: 0;

    @media (max-width: 992px) {
        font-size: 18px;
    }
`;

export const LinkStyled = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    background-color: rgb(77, 216, 158);
    border: none;
    border-radius: 10px;
    max-width: 285px;
    width: 100%;
    height: 54px;
    color: white;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0px rgba(66, 68, 90, 1);

    @media (max-width: 767px) {
        align-self: center;
    }
`;
