import Image from 'next/image'
// import { useRecoilState } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../../core/zustand/store'
import shallow from 'zustand/shallow'
import { Movie } from '../../typings'
import { DocumentData } from 'firebase/firestore'
import Link from 'next/link'
import { memo } from 'react'

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

  const { setModalState: setShowModal, setMovieState: setCurrentMovie } = useStore(
    (state: any) => ({
      setModalState: state.setModalState,
      setMovieState: state.setMovieState
    }),
    shallow
  )

  return (
    <div
      className={`relative h-28 min-w-[280px] cursor-pointer transition duration-200 ease-out md:h-48 md:w-full md:hover:scale-105`}
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Link href={`/detail/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
            }`}
          className={`${styleImg} rounded-sm object-cover`}
          fill
          loading='lazy'
          sizes='100%'
          alt="Mouvee thumbnail"
        />
      </Link>
      {children}
    </div>
  )
}

export default memo(Thumbnail)
