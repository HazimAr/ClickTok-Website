import { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID, META } from "config";

export default function Document() {
  return (
    <Html lang="en-us">
      <Head>
        <meta name="description" content={META.description} />
        <meta name="author" content="https://hazim.tech" />

        <meta property="og:url" content={META.url} />
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          data-ad-client="ca-pub-8350269166887594"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350929026077130"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_TRACKING_ID}',{page_path:window.location.pathname});`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
