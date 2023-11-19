import Barcode from 'react-barcode';
import { Container } from './styles/styles';

interface IBarCodeProps {
    value: string;
}

export default function BarCode({ value }: IBarCodeProps) {
    return (
        <Container>
            <Barcode value={value} />
        </Container>
    );
}
