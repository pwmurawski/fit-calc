/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import GlobalContextProvider from "../provider/GlobalContextProvider";
import LoadingProvider from "../provider/LoadingProvider";
import GlobalStyles from "../styles/GlobalStyles";

const Layouts = dynamic(() => import("../components/Layouts/Layouts"), {
  ssr: false,
});

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
