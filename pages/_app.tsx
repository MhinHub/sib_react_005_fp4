import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
// import { RecoilRoot } from 'recoil'
import NextNprogress from 'nextjs-progressbar'
import Loader from '@components/Loader'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextNprogress
        color="#7254d6"
        options={{ showSpinner: false }}
        showOnShallow={true}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Loader />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
