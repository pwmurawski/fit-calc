import { createContext } from 'react';
import { initialState } from '../reducers/globalReducer';
import { ActionType, IState } from '../types/GlobalReducer';

interface IGlobalContext {
    state: IState;
    dispatch: React.Dispatch<ActionType>;
}

const GlobalContext = createContext<IGlobalContext>({
    state: initialState,
    dispatch: () => {},
});

export default GlobalContext;
