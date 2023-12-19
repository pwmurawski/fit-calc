import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import GlobalContextProvider from '../provider/GlobalContextProvider';
import LoadingProvider from '../provider/LoadingProvider';
import GlobalStyles from '../styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';
import { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Analytics } from '@vercel/analytics/react';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

const OnAppInit: FC<PropsWithChildren> = ({ children }) => {
    return (
        <GlobalContextProvider>
            {children}
            <LoadingProvider />
        </GlobalContextProvider>
    );
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <GlobalStyles />
                <Head>
                    <title>FitCalc</title>
                </Head>
                <Toaster />
                <OnAppInit>{getLayout(<Component {...pageProps} />)}</OnAppInit>
            </SessionProvider>
            <Analytics />
        </>
    );
}
