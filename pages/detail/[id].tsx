import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { Details } from '../../typings';
import { DocumentData } from 'firebase/firestore';
import useStore from '../../core/store'

const Detail = () => {
    const router = useRouter();
    const { id } = router.query;

    console.log('id router link', id)

    const [movie, setMovie] = useState<Details | DocumentData>({})

    // const movie = useStore((state: any) => state.movieState);

    // console.log('Movie detail', movie)
    useEffect(() => {
        async function getData() {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
            )
            console.log('Data api video modal baru', data)
            setMovie(data)
        }
        getData();
    }, [id])

    return (
        <main>
            <h1>{movie?.original_title}</h1>
        </main>
    )
}

export default Detail