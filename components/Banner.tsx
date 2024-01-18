import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Movie, Details } from '../typings'
import { InfoCircle } from 'iconsax-react'
// import { useRecoilState } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../core/zustand/store'
import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
      //console.log('random Number', randomNumber)

      setMovie(mouveeBanner[randomNumber])
    }, 15000)

    return () => clearInterval(interval)
  }, [mouveeBanner])

  return (
    <div className="flex h-[32vh] w-full flex-col md:h-[70vh] md:w-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute left-0 top-0 -z-10 h-[35vh] w-full md:h-[95vh] md:w-screen">
            <Image
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              fill
              priority
              style={{ objectFit: 'cover' }}
              alt="Mouvee banner"
            />
          </div>
          <div className="absolute left-0 top-0 -z-10 h-[36vh] w-screen bg-gradient-to-b from-transparent to-black md:h-[95vh]"></div>
          <section className="mx-6 flex flex-col space-y-2 py-10 md:mx-16 md:space-y-4 md:py-16 lg:h-[65vh] lg:justify-end lg:pb-12">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="max-w-xs text-xs leading-3 text-shadow-md md:max-w-lg lg:max-w-2xl lg:text-base">
              {movie?.overview}
            </p>
            <div className="flex space-x-3">
              <button
                className="bg-glass-gray flex items-center rounded-full px-2 py-1 text-sm font-medium text-white hover:bg-opacity-20 md:px-4 md:py-2 md:text-base md:font-bold"
                onClick={() => {
                  setCurrentMovie(movie)
                  setShowModal(true)
                }}
              >
                More Info{' '}
                <InfoCircle className="h-4 w-4 md:h-6 md:w-6" variant="Bold" />
              </button>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default memo(Banner)
