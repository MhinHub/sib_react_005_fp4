import { useState, useEffect } from 'react'
import { Details, Genre } from '@typings'
import { DocumentData } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import reqApi from '@utils/reqApi'
import { Tabs, Badge } from 'flowbite-react'
import RowFill from '@components/RowFill'
import { MessageText1, Personalcard, People } from 'iconsax-react'

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

    return (
        <main>
            <section className="relative h-screen w-screen bg-gradient-to-t from-black to-transparent">
                <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
                    <Image
                        src={`${baseUrl}/w1280/${movie?.belongs_to_collection !== null
                            ? movie?.belongs_to_collection.backdrop_path
                            : movie?.backdrop_path
                            }`}
                        fill
                        sizes="100%"
                        priority
                        style={{ objectFit: 'cover' }}
                        alt="Mouvee banner"
                    />
                </div>
                <div className="flex absolute mt-[10vh] w-screen">
                    <div className="grid grid-cols-3 gap-2 w-4/5 mx-auto">
                        <Image
                            src={`${baseUrl}/w780/${movie?.poster_path}`}
                            className="rounded-xl"
                            width={280}
                            height={320}
                            alt="Movie Poster"
                        />
                        <div className='flex-col col-start-2 col-span-2' >
                            <h1 className='text-6xl font-bold'>{movie?.original_title}</h1>
                            <div className='flex flex-row py-1 gap-x-1 text-sm pl-2'>
                                <span>{movie.release_date}</span>
                                <span>|</span>
                                <span>{`${(movie.vote_average).toFixed(1)} (${movie.vote_count})`}</span>
                            </div>

                            <div className='flex flex-row w-full'>
                                {movie?.genres.map((genre: Genre) => (
                                    <Badge
                                        key={genre.id}
                                        className="mr-2 rounded-full bg-purple-900 text-indigo-400 badge-glass-text"
                                        color="purple"
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
                                    <div className="flex-1 flex-col h-44 overflow-y-scroll">
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
                                                <div key={review.id} className="flex flex-col">
                                                    <div className="flex flex-row">
                                                        <Image
                                                            src={urlAvatar}
                                                            className="rounded-full"
                                                            width={50}
                                                            height={30}
                                                            alt="Avatar reviewer"
                                                        />
                                                        <div className="flex flex-col ml-4">
                                                            <span>{review.author}</span>
                                                            <span>{review.created_at}</span>
                                                        </div>
                                                    </div>
                                                    <p>{review.content}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title="Cast"
                                    icon={() => <Personalcard variant="Bold" className='text-purple-700 mr-1' />}
                                >
                                    <div className="flex flex-row overflow-x-scroll gap-x-32">
                                        {credits.cast.map((cast: any) => (
                                            <div key={cast.id} className="flex w-full">
                                                <Image
                                                    src={`${baseUrl}/w185/${cast.profile_path}`}
                                                    className="h-32 rounded"
                                                    width={120}
                                                    height={0}
                                                    alt="Avatar actor"
                                                />
                                                <p>
                                                    <span className='flex'>{cast.name}</span>
                                                    <span className='flex'>{cast.character}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title="Crew"
                                    icon={() => <People variant='Bold' className='text-purple-700 mr-1' />}
                                >
                                    {/* with column scroll */}
                                    <div className="grid grid-cols-3 gap-3 h-40 overflow-y-scroll ">
                                        {credits.crew.map((crew: any) => (
                                            <div key={crew.id} className="flex w-full">
                                                <Image
                                                    src={`${baseUrl}/w185/${crew.profile_path}`}
                                                    className="rounded-full h-12"
                                                    width={48}
                                                    height={0}
                                                    alt="Crew avatar"
                                                />
                                                <p>
                                                    <span className='flex'>{crew.name}</span>
                                                    <span className='flex'>{crew.department}</span>
                                                    <span className='flex'>{crew.job}</span>
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
