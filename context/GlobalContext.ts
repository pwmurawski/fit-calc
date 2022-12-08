/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import { initialState } from "../reducers/globalReducer";
import { ActionType, IState } from "../types/GlobalReducerTypes";

interface IGlobalContext {
  state: IState;
  dispatch: React.Dispatch<ActionType>;
}

const GlobalContext = createContext<IGlobalContext>({
  state: initialState,
  dispatch: () => {},
});

export default GlobalContext;
