import { ArrowCircleLeft, ArrowCircleRight } from 'iconsax-react'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './molecules/Thumbnail'
import { DocumentData } from 'firebase/firestore'
import { memo } from 'react'

interface Props {
  movies: Movie[] | DocumentData[]
}

function RowClean({ movies }: Props) {
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

  return (
    <div className="h-44 space-y-0.5 md:space-y-2">
      <div className="group relative md:-ml-2">
        <ArrowCircleLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'
            }`}
          onClick={() => handleClick('left')}
          variant="Bulk"
        />

        <div
          ref={rowRef}
          className="flex items-center overflow-x-scroll scrollbar-hide space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ArrowCircleRight
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick('right')}
          variant="Bulk"
        />
      </div>
    </div>
  )
}

export default memo(RowClean)
