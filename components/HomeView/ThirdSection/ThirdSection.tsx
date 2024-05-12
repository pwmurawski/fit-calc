import Image from 'next/image';
import img from 'public/assets/2.png';
import { Container, ImageContainer, ImageTitle, Title, Title2, Wrapper } from './styles/styles';

export const ThirdSection = () => {
    return (
        <Wrapper>
            <Title>Poznaj funkcje, których codziennie potrzebujesz</Title>
            <Title2>WAŻNE FUNKCJE</Title2>
            <Container>
                <ImageContainer>
                    <ImageTitle>Komunikat o przekroczeniu celów</ImageTitle>
                    <Image src={img} alt="tel" />
                </ImageContainer>
                <ImageContainer>
                    <ImageTitle>Własne cele kaloryczne</ImageTitle>
                    <Image src={img} alt="tel" />
                </ImageContainer>
                <ImageContainer>
                    <ImageTitle>Komunikat o przekroczeniu celów</ImageTitle>
                    <Image src={img} alt="tel" />
                </ImageContainer>
            </Container>
        </Wrapper>
    );
};
