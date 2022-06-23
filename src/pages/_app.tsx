import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@components/Footer";
import Header from "@components/Header";
import theme from "@styles/theme";
import { META } from "config";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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

  return (
    <>
      <Head>
        <title>{META.title}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <Header />

        <Component {...pageProps} />

        <Footer />
      </ChakraProvider>
    </>
  );
}
