import Image from 'next/image'
// import { useRecoilState } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../../core/zustand/store'
import shallow from 'zustand/shallow'
import { Movie } from '@typings'
import { DocumentData } from 'firebase/firestore'
import Link from 'next/link'
import { memo } from 'react'
import { PlayCircle, ExportSquare } from 'iconsax-react'
import { Tooltip } from 'flowbite-react'

interface Props {
  // When using firebase
  // movie: Movie | DocumentData
  movie: Movie | DocumentData
  children?: React.ReactNode
  styleImg?: string
}

function Thumbnail({ movie, children, styleImg }: Props) {
  // const [showModal, setShowModal] = useRecoilState(modalState)
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  const { setIsModalState: setShowModal, setMovieState: setCurrentMovie } =
    useStore(
      (state: any) => ({
        setIsModalState: state.setIsModalState,
        setMovieState: state.setMovieState,
      }),
      shallow
    )

  return (
    <div
      className={`group/thumb md:h-50 relative h-40 min-w-[280px] transition duration-200 ease-out md:w-full md:hover:scale-105`}
    >
      <Link href={`/detail/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className={`${styleImg} rounded-t-xl object-cover`}
          fill
          loading="lazy"
          sizes="100%"
          alt="Mouvee thumbnail"
        />
      </Link>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform md:invisible group-hover/thumb:visible">
        <Tooltip
          content="Play Trailer"
          style="dark"
          placement="top"
          className="z-50 w-fit text-center text-sm"
        >
          <PlayCircle
            className="cursor-pointer text-purple-300"
            size={40}
            variant="Bulk"
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
          />
        </Tooltip>
      </div>

      <Link
        href={`/detail/${movie.id}`}
        className="absolute right-2 top-1/2 -translate-y-1/2 transform md:invisible group-hover/thumb:visible"
      >
        <Tooltip
          content="Detail Movie"
          style="dark"
          placement="top"
          className="z-50 w-fit text-center text-sm"
        >
          <ExportSquare
            className="cursor-pointer text-white"
            size={20}
            variant="TwoTone"
          />
        </Tooltip>
      </Link>
      {children}
    </div>
  )
}

export default memo(Thumbnail)
