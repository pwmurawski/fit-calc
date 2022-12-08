import { ReactNode, useContext } from "react";
import Loading from "../components/Loading/Loading";
import GlobalContext from "../context/GlobalContext";
import useLoadingSSR from "../hooks/useLoadingSSR";

interface ILoadingProviderProps {
  children: ReactNode;
}

export default function LoadingProvider({ children }: ILoadingProviderProps) {
  const loading = useLoadingSSR();
  const { state } = useContext(GlobalContext);

  return (
    <>
      {children}
      {loading || state.isLoading ? <Loading stopClick /> : null}
    </>
  );
}
