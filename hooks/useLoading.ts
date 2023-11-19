import { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

export const useLoading = (isloading?: boolean) => {
    const { state, dispatch } = useContext(GlobalContext);

    const setLoading = (loading: boolean) => {
        dispatch({ type: 'setLoading', isLoading: loading });
    };

    useEffect(() => {
        if (isloading !== undefined) setLoading(isloading);
    }, [isloading]);

    return {
        isLoading: state.isLoading,
        setLoading,
    };
};
