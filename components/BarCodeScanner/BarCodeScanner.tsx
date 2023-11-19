import { useEffect } from 'react';
import { BrowserBarcodeReader, Result } from '@zxing/library';

function BarCodeScanner({ onUpdate }: { onUpdate(err: any, result: Result | undefined): void }): JSX.Element {
    const codeReader = new BrowserBarcodeReader();

    useEffect(() => {
        codeReader
            .decodeOnceFromVideoDevice(undefined, 'video')
            .then((result) => {
                onUpdate(null, result);
            })
            .catch((e) => {
                onUpdate(e, undefined);
            });

        return (): void => {
            codeReader.reset();
        };
    }, [codeReader]);

    return <video id="video" width="100%" height="100%" playsInline />;
}

export default BarCodeScanner;
