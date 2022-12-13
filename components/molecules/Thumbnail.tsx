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

  const { setIsModalState: setShowModal, setMovieState: setCurrentMovie } = useStore(
    (state: any) => ({
      setIsModalState: state.setIsModalState,
      setMovieState: state.setMovieState
    }),
    shallow
  )

  return (
    <div
      className={`relative group/thumb h-40 min-w-[280px] transition duration-200 ease-out md:h-50 md:w-full md:hover:scale-105`}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
          }`}
        className={`${styleImg} rounded-t-xl object-cover`}
        fill
        loading='lazy'
        sizes='100%'
        alt="Mouvee thumbnail"
      />
      <div className='md:invisible group-hover/thumb:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Tooltip
          content="Play Trailer"
          style="dark"
          placement="top"
          className='w-fit z-50 text-center text-sm'
        >
          <PlayCircle
            className='text-white cursor-pointer'
            size={40}
            variant='Bulk'
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
          />
        </Tooltip>
      </div>

      <Link
        href={`/detail/${movie.id}`}
        className='md:invisible group-hover/thumb:visible absolute top-1/2 right-2 transform -translate-y-1/2'
      >
        <Tooltip
          content="Detail Movie"
          style="dark"
          placement="top"
          className='w-fit z-50 text-center text-sm'
        >
          <ExportSquare
            className='text-white cursor-pointer'
            size={20}
            variant='TwoTone'
          />
        </Tooltip>
      </Link>
      {children}
    </div>
  )
}

export default memo(Thumbnail)
