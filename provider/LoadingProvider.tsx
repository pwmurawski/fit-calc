import { useContext } from 'react';
import Loading from '../components/Loading/Loading';
import GlobalContext from '../context/GlobalContext';
import { useLoadingSSR } from '../hooks/useLoadingSSR';

export default function LoadingProvider() {
    const loading = useLoadingSSR();
    const { state } = useContext(GlobalContext);

    if (loading || state.isLoading) {
        return <Loading stopClick />;
    }
    return null;
}
