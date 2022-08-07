import '../styles/globals.css'
import 'bulma'
import Script from 'next/script'
function MyApp({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
  <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
  </>
}

export default MyApp
