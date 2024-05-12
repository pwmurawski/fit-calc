import Image from 'next/image';
import img2 from 'public/assets/2.f4b799c.gif';
import { ImageContainer, Title, Wrapper } from './styles/styles';

export const SecondSection = () => {
    return (
        <Wrapper>
            <Title>Z Fitatu wszystko jest proste</Title>
            <ImageContainer>
                <Image src={img2} alt="tel" />
            </ImageContainer>
        </Wrapper>
    );
};
