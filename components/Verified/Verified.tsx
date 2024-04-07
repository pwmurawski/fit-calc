import { FC } from 'react';
import { Container } from './styles/styles';
import { VerifiedSvg } from 'components/Svg/VerifiedSvg';
import { UnVerifiedSvg } from 'components/Svg/UnVerifiedSvg';

interface VerifiedProps {
    verified: boolean;
}

export const Verified: FC<VerifiedProps> = ({ verified }) => {
    return <Container>{verified ? <VerifiedSvg /> : <UnVerifiedSvg />}</Container>;
};
