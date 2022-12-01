/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import LoadingSSR from "../components/LoadingSSR/LoadingSSR";
import GlobalContextProvider from "../context/GlobalContext/provider/GlobalContextProvider";
import GlobalStyles from "../styles/GlobalStyles";

const Layouts = dynamic(() => import("../components/Layouts/Layouts"), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <GlobalStyles />
      <Layouts>
        <LoadingSSR />
        <Component {...pageProps} />
      </Layouts>
    </GlobalContextProvider>
  );
}
