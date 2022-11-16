import useLoadingSSR from "../../hooks/useLoadingSSR";
import Loading from "../Loading/Loading";

export default function LoadingSSR() {
  const loading = useLoadingSSR();

  if (!loading) return null;
  return <Loading />;
}
