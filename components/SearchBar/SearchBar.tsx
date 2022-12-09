import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Input } from "./styles/styles";
import BarCodeScan from "../Scanner/Scanner";

export default function SearchBar() {
  const { push, query } = useRouter();
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
      <BarCodeScan onScanned={(data) => setSearchTerm(data)} />
    </Container>
  );
}
