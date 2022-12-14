import { ArrowCircleLeft, ArrowCircleRight } from 'iconsax-react'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import { DocumentData } from 'firebase/firestore'
import { memo } from 'react'
import CardItem from './molecules/CardItem'
import Link from 'next/link'

interface Props {
    title: string
    movies: Movie[] | DocumentData[]
    tabs?: any
}

function RowFill({ title, movies, tabs }: Props) {
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

    // console.log('RowFill Mouvies', movies)

    return (
        <div className="h-[22rem] space-y-0.5 md:space-y-2">
            <div className="flex items-center justify-between my-4 px-4">
                <h2 className="w-fit cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                    {title}
                </h2>
                <Link href={`/movies/Action?idc=${28}&page=1`}>
                    View All
                </Link>
            </div>

            {tabs && (
                <div className="flex space-x-2 overflow-x-scroll scrollbar-hide md:space-x-3 md:p-2">
                    {tabs.map((tab: any) => (
                        <Link className="flex items-center text-center justify-center w-max h-8 px-3 text-sm font-semibold text-white transition duration-200 bg-[#1f1f1f] rounded-full hover:bg-[#2f2f2f]" href={`?categories=${tab.name}&idc=${tab.id}&page=1`}>
                            <span>{tab.name}</span>
                        </Link>
                    ))}
                </div>
            )}
            <div className="group relative md:-ml-2">
                <ArrowCircleLeft
                    className={`absolute top-0 bottom-0 -left-10 z-40 m-auto h-9 w-9 cursor-pointer opacity-20 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'
                        }`}
                    onClick={() => handleClick('left')}
                    variant="Bulk"
                />

                <div
                    ref={rowRef}
                    className="flex items-start overflow-x-scroll scrollbar-hide space-x-3 md:p-2"
                >
                    {movies.map((movie, key) => (
                        <CardItem movie={movie} id={key} />
                    ))}
                </div>

                <ArrowCircleRight
                    className={`absolute top-0 bottom-0 -right-10 z-40 m-auto h-9 w-9 cursor-pointer opacity-20 transition hover:scale-125 group-hover:opacity-100`}
                    onClick={() => handleClick('right')}
                    variant="Bulk"
                />
            </div>
        </div>
    )
}

export default memo(RowFill)