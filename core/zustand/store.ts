import create from 'zustand'
import { DocumentData } from 'firebase/firestore'
import { Movie } from '../../typings'

const useStore = create(set => ({
    modalState: false,
    setModalState: (state: boolean) => set({ modalState: state }),
    movieState: null,
    setMovieState: (movie: Movie | DocumentData | null) => set({ movieState: movie }),
}))

export default useStore
