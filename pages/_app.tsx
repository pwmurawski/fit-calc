/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
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
          <Component {...pageProps} />
        </Layouts>
      </LoadingProvider>
    </GlobalContextProvider>
  );
}
