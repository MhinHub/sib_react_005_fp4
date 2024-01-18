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
      <div className="my-4 flex items-center justify-between px-4">
        <h2 className="w-fit cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          {title}
        </h2>
        <Link
          href={`/movies/Action?idc=${28}&page=1`}
          className="underline-offset-2 hover:underline"
        >
          View All
        </Link>
      </div>

      {tabs && (
        <div className="flex space-x-2 overflow-x-scroll scrollbar-hide md:space-x-3 md:p-2">
          {tabs.map((tab: any) => (
            <Link
              className="flex h-8 w-max items-center justify-center whitespace-nowrap rounded-full bg-[#1f1f1f] px-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-[#2f2f2f]"
              href={`?categories=${tab.name}&idc=${tab.id}&page=1`}
            >
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
      )}
      <div className="group relative md:-ml-2">
        <ArrowCircleLeft
          className={`absolute -left-10 bottom-0 top-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-20 transition group-hover:opacity-100 hover:scale-125 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
          variant="Bulk"
        />

        <div
          ref={rowRef}
          className="flex items-start space-x-3 overflow-x-scroll scrollbar-hide md:p-2"
        >
          {movies.map((movie, key) => (
            <CardItem movie={movie} id={key} />
          ))}
        </div>

        <ArrowCircleRight
          className={`absolute -right-10 bottom-0 top-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-20 transition group-hover:opacity-100 hover:scale-125`}
          onClick={() => handleClick('right')}
          variant="Bulk"
        />
      </div>
    </div>
  )
}

export default memo(RowFill)
