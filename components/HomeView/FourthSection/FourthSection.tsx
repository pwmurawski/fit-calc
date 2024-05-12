import Image from 'next/image';
import img from 'public/assets/2.png';
import { Container, ImageContainer, ImageTitle, Title, Wrapper } from './styles/styles';

export const FourthSection = () => {
    return (
        <Wrapper>
            <Title>WAŻNE FUNKCJE</Title>
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
