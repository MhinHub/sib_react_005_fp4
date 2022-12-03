import { useState, useEffect } from 'react'
import { Details, Genre } from '../../typings'
import { DocumentData } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

interface Props {
    movie: Details | DocumentData
}

const Detail = ({ movie }: Props) => {
    const baseUrl = 'https://image.tmdb.org/t/p'

    console.log('Movie Details', movie)

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
                <div className="flex absolute mt-[20vh] w-screen">
                    <div className="flex w-4/5 mx-auto">
                        <Image
                            src={`${baseUrl}/w780/${movie?.poster_path}`}
                            className="rounded-xl"
                            width={280}
                            height={320}
                            alt="Movie Poster"
                        />
                        <div className='flex-col ml-10'>
                            <h1 className='text-6xl font-bold'>{movie?.original_title}</h1>
                            {movie?.genres.map((genre: Genre) => (
                                <div key={genre.id} className='flex-row'>
                                    <p>{genre.name}</p>
                                </div>
                            ))}
                            <span>{movie.release_date}</span>
                            <span>{` | ${(movie.vote_average).toFixed(1)} (${movie.vote_count})`}</span>
                            <p>{movie?.overview}</p>
                            <h2></h2>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Detail

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos`
    ).then((res) => res.json())

    return {
        props: {
            movie: data,
        },
    }
}
