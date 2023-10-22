import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Layouts from "../components/Layouts/Layouts";
import GlobalContextProvider from "../provider/GlobalContextProvider";
import LoadingProvider from "../provider/LoadingProvider";
import GlobalStyles from "../styles/GlobalStyles";
import { Toaster } from 'react-hot-toast';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
      <GlobalContextProvider>
        <SessionProvider session={session}>
        <GlobalStyles />
        <LoadingProvider />
          <Layouts>
            <Head>
              <title>FitCalc</title>
            </Head>
            <Toaster />
            <Component {...pageProps} />
          </Layouts>
        </SessionProvider>
      </GlobalContextProvider>
  );
}
