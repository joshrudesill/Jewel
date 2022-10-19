import '../styles/mycolors.scss'
import '../styles/globals.css'
import 'bulma-tooltip'
import Script from 'next/script'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <>
  <Head>
    <title>
      Jewel
    </title>
  </Head>
  <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-8X7CQ21G90`} />

  <Script strategy="afterInteractive" id='gtag'>
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8X7CQ21G90');
      `}
  </Script>
  <Component {...pageProps} />
  <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
  <Script type="module" src="https://www.jsdelivr.com/package/npm/@creativebulma/bulma-tooltip"></Script>
  <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>

  

  </>
}

export default MyApp
