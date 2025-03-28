import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

type CustomAppProps = AppProps & {
  pageProps: any;
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // @ts-ignore
      window.gtag('config', 'G-QJZY4L0N1X', {
        page_path: url,
      })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
} 