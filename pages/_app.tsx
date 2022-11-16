/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import Layouts from "../components/Layouts/Layouts";
import LoadingSSR from "../components/LoadingSSR/LoadingSSR";
import GlobalContextProvider from "../context/GlobalContext/provider/GlobalContextProvider";
import GlobalStyles from "../styles/GlobalStyles";

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
