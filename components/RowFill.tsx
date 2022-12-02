import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'
import { DocumentData } from 'firebase/firestore'
import { Flag, Star1, Card } from 'iconsax-react'
import { memo } from 'react'

interface Props {
    title: string
    movies: Movie[] | DocumentData[]
}

function RowFill({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction: string) => {
        setIsMoved(true)

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current

            const scrollTo =
                direction === 'left'
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    console.log('RowFill Mouvies', movies)

    return (
        <div className="h-80 space-y-0.5 md:space-y-2">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title}
            </h2>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'
                        }`}
                    onClick={() => handleClick('left')}
                />

                <div
                    ref={rowRef}
                    className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-3 md:p-2"
                >
                    {movies.map((movie) => {
                        const codeCountry = movie.original_language.toUpperCase()

                        const truncate = (str: string, n: number = 150) => {
                            return str?.length > n ? str.substr(0, n - 1) + '...' : str
                        }
                        return (
                            <div key={movie.id} className="flex-col group pt-3 px-4 rounded-2xl bg-glass-gray left-10 top-52 transition duration-200 ease-out hover:scale-105">
                                <Thumbnail movie={movie} styleImg="rounded-t-xl" >
                                    <p className='absolute font-medium pt-1 text-center bg-glass w-full bottom-0 rounded-b-md'>{movie.title}</p>
                                </Thumbnail>
                                <p className='flex justify-around my-3'>
                                    <div className='flex items-center'>
                                        <Card className='text-sky-500' variant="Bulk" />
                                        <span className='badge-glass-text bg-sky-500 text-sky-400'>
                                            {new Date(movie.release_date).getFullYear()}
                                        </span>
                                    </div>
                                    <div className='flex items-center'>
                                        <Flag className='text-purple-500' variant="Bulk" />
                                        <span className='badge-glass-text bg-purple-500 text-purple-400'>
                                            {new Intl.DisplayNames(['en'], { type: 'language' }).of(codeCountry)}
                                        </span>
                                    </div>
                                    <div className='flex items-center'>
                                        <Star1 className='text-yellow-500' variant="Bulk" />
                                        <span className='badge-glass-text bg-yellow-500 text-yellow-400'>
                                            {`${movie.vote_average} (${movie.vote_count})`}
                                        </span>
                                    </div>
                                </p>
                                <p className='text-sm transition hidden group-hover:block font-light pb-2 px-1'>{truncate(movie.overview)}</p>
                            </div>
                        )
                    })}
                </div>

                <ChevronRightIcon
                    className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    )
}

export default memo(RowFill)