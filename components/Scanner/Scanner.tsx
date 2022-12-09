/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Icon, RedLine, ScannBtn, ScannerContainer } from "./styles/styles";
import scannerIcon from "../../assets/barcode.png";
import BarCodeScanner from "../BarCodeScanner/BarCodeScanner";

interface IBarCodeScanProps {
  onScanned: (data: string) => void;
}

export default function Scanner({ onScanned }: IBarCodeScanProps) {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <>
      <ScannBtn type="button" onClick={() => setShowScanner(!showScanner)}>
        <Icon src={scannerIcon.src} alt="scanner-bar" />
      </ScannBtn>
      {showScanner ? (
        <ScannerContainer>
          <BarCodeScanner
            onUpdate={(err, resp) => {
              if (resp) {
                onScanned(resp.getText());
                setShowScanner(false);
              }
            }}
          />
          <RedLine />
        </ScannerContainer>
      ) : null}
    </>
  );
}
