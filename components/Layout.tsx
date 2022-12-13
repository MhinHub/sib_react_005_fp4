import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { ScrollerMotion } from 'scroller-motion'
import useStore from '../core/zustand/store'
import Modal from './Modal'

const Layout = ({ children, title }: any) => {
    const showModal = useStore((state: any) => state.isModalState)

    return (
        <>
            <Head>
                <title>{title} - Mouvee</title>
            </Head>
            <Navbar />
            {/* <ScrollerMotion
                scale={1.5}
            > */}
            {children}
            {showModal && <Modal />}

            {/* </ScrollerMotion> */}
            <Footer />
        </>
    )
}

export default Layout
