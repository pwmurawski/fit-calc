/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import { ActionType, IState } from "../../interfaces/IGlobalReducer";

interface IGlobalContext {
  state: IState;
  dispatch: React.Dispatch<ActionType>;
}

const GlobalContext = createContext<IGlobalContext>({
  state: {
    mealId: undefined,
    date: undefined,
  },
  dispatch: () => {},
});

export default GlobalContext;
