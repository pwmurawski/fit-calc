import { Container, Spinner } from './styles/styles';

interface ILoadingProps {
    stopClick?: boolean;
}

const defaultProps = {
    stopClick: undefined,
};

export default function Loading({ stopClick }: ILoadingProps) {
    return (
        <Container stopClick={stopClick}>
            <Spinner>Loading ...</Spinner>
        </Container>
    );
}

Loading.defaultProps = defaultProps;
