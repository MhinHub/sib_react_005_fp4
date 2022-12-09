import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { DocumentData } from 'firebase/firestore'
import { Movie } from '@typings'

let store: any = (set: any) => ({
    isModalState: false,
    setIsModalState: (state: boolean) => set({ isModalState: state }, false, "setIsModalState"),
    movieState: null,
    setMovieState: (movie: Movie | DocumentData | null) => set({ movieState: movie }, false, "setIsMovieState"),
})

store = persist(store, { name: 'movie-app' })
store = devtools(store, { name: 'zustand' })

const useStore = create(store)

export default useStore