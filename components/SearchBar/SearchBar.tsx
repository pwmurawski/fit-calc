import { useRouter } from 'next/router';
import { Container, Input } from './styles/styles';
import BarCodeScan from '../Scanner/Scanner';
import { useEffect, useState } from 'react';
import { isString } from 'lodash';

export default function SearchBar() {
    const { push, query, isReady } = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>();

    const search = (term: string) => {
        push({ pathname: '/foodProducts/search', query: { term } });
    };

    useEffect(() => {
        if (isReady) {
            if (isString(query.term)) {
                if (query.term.length > 0) {
                    setSearchTerm(query.term);
                } else {
                    push('/foodProducts');
                }
            }
        }
    }, [query.term]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isString(searchTerm)) {
                search(searchTerm);
            }
        }, 550);

        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm]);

    return (
        <Container>
            <Input placeholder="Szukaj ..." value={searchTerm ?? ''} onChange={(e) => setSearchTerm(e.target.value)} />
            <BarCodeScan onScanned={(data) => setSearchTerm(data)} />
        </Container>
    );
}
