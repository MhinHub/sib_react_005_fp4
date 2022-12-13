import Lottie from 'lottie-react'
import animationData from '../public/lottie/clipboard.json'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// export default function Loading() {
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex items-center justify-center w-full h-screen"
//         >
//             <Lottie animationData={animationData} />
//         </motion.div>
//     )
// }


export default function Loader() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: any) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url: any) => (url === router.asPath) && setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex fixed items-center justify-center w-full h-full bg-black bg-opacity-90 z-[60]"
                >
                    <Lottie animationData={animationData} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

