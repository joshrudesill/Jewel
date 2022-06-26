import '../styles/globals.css'
import 'bulma'
function MyApp({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
  </>
}

export default MyApp
