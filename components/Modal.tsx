import { CloseCircle, VolumeSlash, VolumeHigh, ArchiveAdd, ArchiveTick, Like1, Play } from 'iconsax-react'
import MuiModal from '@mui/material/Modal'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ReactPlayer from 'react-player/lazy'
// import { useRecoilState } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import shallow from 'zustand/shallow'
import useStore from '../core/zustand/store'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import { Element, Genre, Movie } from '../typings'
import axios from 'axios'
import { memo } from 'react'

function Modal() {
  // const [showModal, setShowModal] = useRecoilState(modalState)
  // const [movie, setMovie] = useRecoilState(movieState)

  const { isModalState: showModal, setIsModalState: setShowModal } = useStore(
    (state: any) => ({
      isModalState: state.isModalState,
      setIsModalState: state.setIsModalState
    }),
    shallow
  )

  const movie = useStore((state: any) => state.movieState)

  console.log('Modal movie', movie)

  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)
  const { user } = useAuth()
  const [addedToList, setAddedToList] = useState(false)
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])

  const [isLiked, setIsLiked] = useState(false)

  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  }

  useEffect(() => {
    console.log("Data from modal movie", movie)

    if (!movie) return

    async function fetchMovie() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
      )

      console.log('Data api video modal', data)

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])

  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  )

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
      )

      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 2000,
          style: toastStyle,
        }
      )
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
        { ...movie }
      )

      toast(
        `${movie?.title || movie?.original_name} has been added to My List`,
        {
          duration: 2000,
          style: toastStyle,
        }
      )
    }
  }

  const handleClose = () => {
    setShowModal(false)
  }

  console.log('trailer ', trailer)

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="absolute z-40 mt-3 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          onClick={handleClose}
          className="absolute right-0 top-0 z-50"
        >
          <CloseCircle size={40} className="hover:text-red-500" variant='Bulk' />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            controls
            // playIcon={}
            // playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <Play className="h-7 w-7 text-black" variant='Bold' />
                Play
              </button>

              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <ArchiveTick className="h-7 w-7 text-green-400" variant='Bulk' />
                ) : (
                    <ArchiveAdd className="h-7 w-7" variant='Bulk' />
                )}
              </button>

              <button
                className="modalButton"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Like1 className={`h-7 w-7 ${isLiked && 'text-blue-500'}`} variant='Bulk' />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeSlash className="h-6 w-6" variant='Bulk' />
              ) : (
                  <VolumeHigh className="h-6 w-6 text-purple-400" variant='Bulk' />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {(movie?.vote_average * 10).toFixed()}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default memo(Modal)