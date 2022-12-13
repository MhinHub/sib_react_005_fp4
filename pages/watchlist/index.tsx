import useList from '@hooks/useList'
import useAuth from '@hooks/useAuth'
import Layout from '@components/Layout'
import CardItem from '@components/molecules/CardItem'
import Link from 'next/link'
import { Breadcrumb } from 'flowbite-react'
import { Home } from 'iconsax-react'

const Watchlist = () => {
    const { loading, user } = useAuth()

    console.log('user', user)

    const list = useList(user?.uid)

    if (loading) return null

    return (
        <Layout title="Watchlist">
            <Breadcrumb className='ml-5 mt-4 px-5 py-2 rounded-full bg-glass-gray w-fit'>
                <Breadcrumb.Item
                    icon={() => <Home className="text-gray-200" variant="Bulk" />}
                >
                    <Link href="/" className='text-white underline underline-offset-4'>
                        Home
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <p className='text-white'>Watchlist</p>
                </Breadcrumb.Item>
            </Breadcrumb>
            <main className="relative mx-6 pb-24 lg:space-y-10 lg:px-16">
                <h1 className="text-4xl font-bold text-center my-4">Watchlist</h1>
                <section className="mx-auto md:mx-20 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {list.length > 0 && list.map((movie: any) => (
                        <CardItem key={movie.id} movie={movie} />
                    ))}
                </section>
            </main>
        </Layout>
    )
}

export default Watchlist
