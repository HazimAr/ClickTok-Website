import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { META, GA_TRACKING_ID } from "../config";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const session = pageProps?.session;
  useEffect(() => {
    const handleRouteChange = (url: unknown) => {
      // @ts-ignore
      window.gtag("config", GA_TRACKING_ID, {
        page_location: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>{META.title}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <div style={{ minHeight: "100vh" }}>
            {getLayout(<Component {...pageProps} />)}
          </div>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}
