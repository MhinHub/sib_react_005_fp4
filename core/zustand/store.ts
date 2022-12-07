import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { DocumentData } from 'firebase/firestore'
import { Movie } from '@typings'
import { useRouter } from 'next/router'

let store: any = (set: any) => ({
    isModalState: false,
    setIsModalState: (state: boolean) => set({ isModalState: state }, false, "setIsModalState"),
    movieState: null,
    setMovieState: (movie: Movie | DocumentData | null) => set({ movieState: movie }, false, "setIsMovieState"),
    // route: (page: any) => set(router.)    
})

store = persist(store, { name: 'movie-app' }) // for persisting state in localStorage
store = devtools(store, { name: 'zustand' }) // for debugging state in browser devtools extension

const useStore = create(store)

export default useStore