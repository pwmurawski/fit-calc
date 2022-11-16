import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Container,
  Icon,
  Input,
  RedLine,
  ScannBtn,
  Scanner,
} from "./styles/styles";
import scannerIcon from "../../assets/barcode.png";

const BarCodeScanner = dynamic(() => import("barcode-react-scanner"), {
  ssr: false,
});

export default function SearchBar() {
  const { push, query } = useRouter();
  const [showScanner, setShowScanner] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query.term ?? "");

  useEffect(() => {
    if (searchTerm.length > 0) {
      push({ pathname: "/foodProducts/search", query: { term: searchTerm } });
    } else {
      push("/foodProducts");
    }
  }, [searchTerm]);

  return (
    <Container>
      <Input
        placeholder="Szukaj ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ScannBtn onClick={() => setShowScanner(!showScanner)}>
        <Icon src={scannerIcon.src} alt="scanner-bar" />
      </ScannBtn>
      {showScanner ? (
        <Scanner>
          <BarCodeScanner
            onUpdate={(err, resp): void => {
              if (resp) {
                setSearchTerm(resp.getText());
                setShowScanner(false);
              }
            }}
          />
          <RedLine />
        </Scanner>
      ) : null}
    </Container>
  );
}
