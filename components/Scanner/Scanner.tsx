/* eslint-disable no-unused-vars */
import { useState } from "react";
import { RedLine, ScannBtn, ScannerContainer } from "./styles/styles";
import BarCodeScanner from "../BarCodeScanner/BarCodeScanner";
import BarCodeSvg from "../Svg/BarCodeSvg";

interface IBarCodeScanProps {
  onScanned: (data: string) => void;
}

export default function Scanner({ onScanned }: IBarCodeScanProps) {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <>
      <ScannBtn type="button" onClick={() => setShowScanner(!showScanner)}>
        <BarCodeSvg />
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
