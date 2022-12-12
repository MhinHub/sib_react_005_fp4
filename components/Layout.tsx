import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, title }: any) => {
    return (
        <>
            <Head>
                <title>{title} - Mouvee</title>
            </Head>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout
