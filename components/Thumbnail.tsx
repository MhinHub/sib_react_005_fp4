import Image from 'next/image'
// import { useRecoilState } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../core/store'
import shallow from 'zustand/shallow'
import { Movie } from '../typings'
import { DocumentData } from 'firebase/firestore'

interface Props {
  // When using firebase
  // movie: Movie | DocumentData
  movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
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
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path || movie.poster_path
          }`}
        className="rounded-sm object-cover md:rounded"
        fill
        alt="Mouvee thumbnail"
      />
    </div>
  )
}

export default Thumbnail
