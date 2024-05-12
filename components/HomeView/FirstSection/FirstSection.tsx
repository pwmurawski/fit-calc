import Image from 'next/image';
import img from 'public/assets/2.png';
import { Wrapper, ImageContainer, Container, TextContainer, Title, Typography, LinkStyled } from './styles/styles';
import { useSession } from 'next-auth/react';

export const FirstSection = () => {
    const session = useSession();

    return (
        <Wrapper>
            <ImageContainer>
                <Image src={img} alt="tel" />
            </ImageContainer>
            <Container>
                <TextContainer>
                    <Title>Najprostszy kalkulator kalorii i dieta na świecie</Title>
                    <Typography>Z nami możesz schudnąć, utrzymać obecną sylwetkę lub nabrać masy</Typography>
                </TextContainer>
                {session.status === 'authenticated' ? (
                    <LinkStyled href="/app">Przejdz do aplikacji</LinkStyled>
                ) : (
                    <LinkStyled href="/login">Zaloguj sie</LinkStyled>
                )}
            </Container>
        </Wrapper>
    );
};
