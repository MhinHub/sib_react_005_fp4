import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
// import { RecoilRoot } from 'recoil'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <NextNprogress
        color="#fff"
        options={{ showSpinner: false }}
        showOnShallow={true}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </AuthProvider>
  )
}

export default MyApp
