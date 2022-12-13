import { useRouter } from 'next/navigation'
import Head from 'next/head'

const PageNotFound = () => {
    const router = useRouter()

    function handleGoBack() {
        router.back()
    }

    return (
        <>
            <Head>
                <title>Page Not Found - Mouvee</title>
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-9xl font-extrabold mb-4 bg-gradient-to-br from-blue-800 to-purple-800 text-transparent bg-clip-text">Oops!</h1>
                <p className="text-2xl font-bold">404 - Page Not Found</p>
                <button
                    onClick={handleGoBack}
                    className="text-white mt-10 px-4 py-2 rounded-full bg-gradient-to-br from-blue-800 to-purple-800"
                >
                    Go Back
                </button>
            </div>
        </>
    )
}

export default PageNotFound