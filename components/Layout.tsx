import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import SmoothScroll from './SmoothScroll'

const Layout = ({ children, title }: any) => {
    return (
        <>
            <Head>
                <title>{title} - Mouvee</title>
            </Head>
            <Header />
            <SmoothScroll>
                {children}
            </SmoothScroll>
            <Footer />
        </>
    )
}

export default Layout
