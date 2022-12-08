import { ReactNode, useMemo, useReducer } from "react";
import GlobalContext from "../context/GlobalContext";
import { globalReducer, initialState } from "../reducers/globalReducer";

interface IGlobalContextProviderProps {
  children: ReactNode;
}

export default function GlobalContextProvider({
  children,
}: IGlobalContextProviderProps) {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const reducerValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GlobalContext.Provider value={reducerValue}>
      {children}
    </GlobalContext.Provider>
  );
}
