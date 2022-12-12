import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Movie, Details } from '../typings'
import { InformationCircleIcon } from '@heroicons/react/solid'
// import { useRecoilState } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../core/zustand/store'
import { memo } from 'react'

interface Props {
  mouveeBanner: Movie[]
}

function Banner({ mouveeBanner }: Props) {
  // const [showModal, setShowModal] = useRecoilState(modalState)
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const setShowModal = useStore((state: any) => state.setIsModalState)
  const setCurrentMovie = useStore((state: any) => state.setMovieState)

  const [movie, setMovie] = useState<Movie | null>(mouveeBanner[0])

  const baseUrl = 'https://image.tmdb.org/t/p/original/'

  // movieBanner changes automatically every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * mouveeBanner.length)
      console.log('random Number', randomNumber)

      setMovie(
        mouveeBanner[randomNumber]
      )
    }, 15000)

    return () => clearInterval(interval)
  }, [mouveeBanner])

  return (
    <div className="flex flex-col w-screen h-[70vh]">
      <div className="absolute top-0 left-0 -z-20 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          fill
          sizes='100%'
          priority
          style={{ objectFit: 'cover' }}
          alt="Mouvee banner"
        />
      </div>
      <div className='absolute top-0 left-0 bg-gradient-to-b from-transparent to-black -z-10 h-[95vh] w-screen'></div>
      <section className="flex flex-col space-y-2 py-16 mx-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="max-w-xs text-xs text-shadow-md md:max-w-lg lg:max-w-2xl lg:text-base">
          {movie?.overview}
        </p>
        <div className="flex space-x-3">
          <button
            className="flex bg-glass-gray items-center rounded-full px-4 py-2 text-base font-bold text-white hover:bg-opacity-20"
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
          >
            More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default memo(Banner)
