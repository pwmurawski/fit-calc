import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useLoadingSSR = () => {
  const { events, asPath } = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== asPath && setLoading(true);
    const handleComplete = () => setLoading(false);

    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);
    events.on("routeChangeError", handleComplete);

    return () => {
      events.off("routeChangeStart", handleStart);
      events.off("routeChangeComplete", handleComplete);
      events.off("routeChangeError", handleComplete);
    };
  }, [asPath]);

  return loading;
};

export default useLoadingSSR;
