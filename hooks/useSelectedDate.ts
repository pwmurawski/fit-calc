import { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import { format } from 'date-fns';

export const useSelectedDate = (isDate?: Date) => {
    const { state, dispatch } = useContext(GlobalContext);

    const setDate = (date: Date) => {
        dispatch({ type: 'setDate', date });
    };

    useEffect(() => {
        if (isDate !== undefined) setDate(isDate);
    }, [isDate]);

    return {
        date: state.date,
        formatDate: format(state.date, 'yyyy-MM-dd'),
        setDate,
    };
};
