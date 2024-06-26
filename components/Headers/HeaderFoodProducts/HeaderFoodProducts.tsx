import { useRouter } from 'next/router';
import { BackLink, Container, Logo } from './styles/styles';
import BackArrowSvg from '../../Svg/BackArrowSvg';

interface HeaderFoodProductsProps {
    href?: string;
}

export default function HeaderFoodProducts({ href }: HeaderFoodProductsProps) {
    const { pathname, query } = useRouter();

    const getHref = (): string => {
        if (pathname.includes('edit')) return `/foodProducts/${query.id}`;
        if (pathname === '/foodProducts') return `/app`;
        if (pathname.includes('selectedProduct')) return `/app`;
        if (pathname.includes('dailyGoals')) return `/app`;
        if (pathname.includes('summary')) return `/app`;
        if (pathname.includes('profile')) return `/app`;
        return './';
    };

    return (
        <Container>
            <BackLink href={href ?? getHref()}>
                <BackArrowSvg />
            </BackLink>
            <Logo>FitCALC</Logo>
        </Container>
    );
}
