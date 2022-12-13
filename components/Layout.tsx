import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { ScrollerMotion } from 'scroller-motion'

const Layout = ({ children, title }: any) => {
    return (
        <>
            <Head>
                <title>{title} - Mouvee</title>
            </Head>
            <Header />
            {/* <ScrollerMotion
                scale={1.5}
            > */}
            {children}
            {/* </ScrollerMotion> */}
            <Footer />
        </>
    )
}

export default Layout
