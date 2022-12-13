import { useState, useEffect } from 'react'
import { Details, Genre } from '@typings'
import { DocumentData } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import moment from 'moment'
import reqApi from '@utils/reqApi'
import { Tabs, Badge, Breadcrumb } from 'flowbite-react'
import RowFill from '@components/RowFill'
import { MessageText1, Personalcard, People, Clock, Star, Home } from 'iconsax-react'
import Link from 'next/link'
import Layout from '@components/Layout'

interface Props {
    movie: Details | DocumentData
    similarMovies: Details[]
    credits: {
        cast: any[]
        crew: any[]
    }
    reviews: any
}

const Detail = ({ movie, credits, similarMovies, reviews }: Props) => {
    const baseUrl = 'https://image.tmdb.org/t/p'

    console.log('Movie Details', movie)
    console.log('Credits', credits)
    console.log('Similar Movies', similarMovies)
    console.log('Reviews', reviews)

    const [deviveType, setDeviceType] = useState('desktop')

    const getDeviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        if (
            /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return "mobile";
        }
        return "desktop";
    };

    useEffect(() => {
        setDeviceType(getDeviceType())
    }, [])

    return (
        <Layout title={movie?.title}>
            <main>
                <section className="relative h-screen w-screen bg-gradient-to-t from-black to-transparent">
                    <Breadcrumb className='absolute ml-5 mt-4 px-5 py-2 rounded-full bg-glass-gray w-fit'>
                        <Breadcrumb.Item
                            icon={() => <Home className="text-gray-200" variant="Bulk" />}
                        >
                            <Link href="/" className='text-white underline underline-offset-4'>
                                Home
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <p className='text-white'>Detail</p>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <p className='text-white'>{movie?.title}</p>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
                        <Image
                            src={`${deviveType === 'desktop' || deviveType === 'tablet'
                                ? baseUrl + '/w1280' + movie?.backdrop_path
                                : baseUrl + '/w780' + movie?.poster_path}`}
                            fill
                            sizes="100%"
                            priority
                            style={{ objectFit: 'cover' }}
                            alt="Mouvee banner"
                        />
                    </div>
                    <div className="flex absolute mt-[10vh] w-screen">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-4/5 mx-auto">
                            <Image
                                src={`${baseUrl}/w780/${movie?.poster_path}`}
                                className="md:rounded-xl max-sm:hidden"
                                width={280}
                                height={320}
                                alt="Movie Poster"
                            />
                            <div className='flex-col md:col-start-2 md:col-span-2' >
                                <h1 className='text-4xl md:text-6xl font-bold'>{movie?.original_title}</h1>
                                <div className='flex flex-row pb-4 gap-x-4 items-center text-sm pl-2'>
                                    <span className='flex items-center gap-x-1'>
                                        <Clock className='text-gray-200' variant='Bulk' />
                                        {new Date(movie.release_date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                    <span>|</span>
                                    <span className='flex items-center gap-x-1'>
                                        <Star className='text-gray-200' variant='Bulk' />
                                        {`${(movie.vote_average).toFixed(1)} (${movie.vote_count})`}
                                    </span>
                                </div>

                                <div className='flex flex-row w-full'>
                                    {movie?.genres.map((genre: Genre) => (
                                        <Badge
                                            key={genre.id}
                                            className="mr-2 rounded-full bg-gray-700 text-gray-200 badge-glass-text"
                                            color="default"
                                            size="sm"
                                        >
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </div>
                                <p className='py-4 font-medium'>{movie?.overview}</p>

                                <Tabs.Group
                                    aria-label="Tabs with icons"
                                    style="underline"
                                    className="justify-around"
                                >
                                    <Tabs.Item
                                        active
                                        title="Comment"
                                        icon={() => <MessageText1 variant='Bold' className='text-purple-700 bg-glass mr-1' />}
                                    >
                                        <div className="flex-1 flex-col h-52 overflow-y-scroll scrollbar-all">
                                            {reviews.results.map((review: any) => {
                                                const oriUrlAvatar: string = review.author_details.avatar_path
                                                console.log('Wrong Url Avatar', oriUrlAvatar)

                                                const urlAvatar = String(oriUrlAvatar).includes("https")
                                                    ? String(oriUrlAvatar).substring(1)
                                                    : oriUrlAvatar === null
                                                        ? 'https://www.gravatar.com/avatar/f44259356bf6110070ed799323d539d6.jpg'
                                                        : (baseUrl + '/w185' + oriUrlAvatar)


                                                console.log('urlAvatar', urlAvatar)

                                                return (
                                                    <div key={review.id} className="flex flex-col w-full bg-glass px-4 py-3 mb-6">
                                                        <div className="flex flex-row">
                                                            <Image
                                                                src={urlAvatar}
                                                                className="rounded-full"
                                                                width={50}
                                                                height={30}
                                                                alt="Avatar reviewer"
                                                            />
                                                            <div className="flex flex-col ml-4">
                                                                <span className='font-bold'>{review.author}</span>
                                                                <span className='text-sm'>{moment(review.created_at).fromNow()}</span>
                                                            </div>
                                                        </div>
                                                        <p className='ml-16 mr-2 w-fit bg-glass-gray p-4 rounded-2xl'>{review.content}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Tabs.Item>
                                    <Tabs.Item
                                        title="Cast"
                                        icon={() => <Personalcard variant="Bold" className='text-purple-700 mr-1' />}
                                    >
                                        <div className="grid grid-flow-col overflow-x-scroll gap-x-6 scrollbar-all">
                                            {credits.cast.map((cast: any) => (
                                                <div key={cast.id} className="flex flex-row w-max bg-glass-gray px-4 py-3">
                                                    <Image
                                                        src={`${baseUrl}/w185/${cast.profile_path}`}
                                                        className="object-cover rounded"
                                                        width={80}
                                                        height={80}
                                                        alt="Avatar actor"
                                                    />
                                                    <p className='flex flex-col pl-2 justify-center items-center'>
                                                        <span>{cast.name}</span>
                                                        <span>as</span>
                                                        <span>{cast.character}</span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </Tabs.Item>
                                    <Tabs.Item
                                        title="Crew"
                                        icon={() => <People variant='Bold' className='text-purple-700 mr-1' />}
                                    >
                                        <div className="grid grid-cols-3 gap-3 h-40 overflow-y-scroll scrollbar-all">
                                            {credits.crew.map((crew: any) => (
                                                <div key={crew.id} className="flex w-full">
                                                    <p className='flex flex-col'>
                                                        <span className='font-bold'>{crew.name}</span>
                                                        <span className='text-sm'>{crew.job}</span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                    </Tabs.Item>
                                </Tabs.Group>

                            </div>
                        </div>
                    </div>
                </section>
                <section className='relative mt-40 px-4 pb-24 lg:space-y-24 lg:px-16'>
                    <RowFill key={movie.id} title="Similar Movies" movies={similarMovies} />
                </section>
            </main>
        </Layout>
    )
}

export default Detail

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.query.id

    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos`
    ).then((res) => res.json())

    const [
        similarMovies,
        credits,
        reviews,
    ] = await Promise.all([
        reqApi.getSimilarMovies(id).then((res) => res.results),
        reqApi.getCredits(id),
        reqApi.getReviews(id),
    ])

    return {
        props: {
            movie: data,
            similarMovies,
            credits,
            reviews,
        },
    }
}
