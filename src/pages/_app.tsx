import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import theme from "../styles/theme";
import { META, GA_TRACKING_ID } from "../config";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";

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
        <link rel="icon" href="/logo_white.png" />
        <Script
          id="Adsense-id"
          async
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8350269166887594"
          crossOrigin="anonymous"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <div style={{ minHeight: "100vh" }}>
          <Header />

          <Component {...pageProps} />

          <Footer />
        </div>
      </ChakraProvider>
    </>
  );
}
