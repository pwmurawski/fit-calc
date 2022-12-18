/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import Head from "next/head";
import Layouts from "../components/Layouts/Layouts";
import GlobalContextProvider from "../provider/GlobalContextProvider";
import LoadingProvider from "../provider/LoadingProvider";
import GlobalStyles from "../styles/GlobalStyles";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <GlobalStyles />
      <LoadingProvider>
        <Layouts>
          <Head>
            <title>FitCalc</title>
          </Head>
          <Component {...pageProps} />
        </Layouts>
      </LoadingProvider>
    </GlobalContextProvider>
  );
}
