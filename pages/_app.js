import '../styles/globals.css'
import 'bulma'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return <>
  <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-8X7CQ21G90`} />

<Script strategy="lazyOnload" id='gtag'>
    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-8X7CQ21G90', {
        page_path: window.location.pathname,
        });
    `}
</Script>
  <Component {...pageProps} />
  <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
  <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>



  </>
}

export default MyApp
