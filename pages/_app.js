import '../styles/globals.css'
import Firebase, { FirebaseContext } from '../src/Firebase'

function MyApp({ Component, pageProps }) {
  return(
    <FirebaseContext.Provider value={new Firebase()}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
