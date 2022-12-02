import { useRouter } from "next/router";
import axios from 'axios';
import useStore from '../../core/store'

const Detail = () => {
    const router = useRouter();
    const { id } = router.query;

    console.log('id router link', id)

    // const movie = useStore((state: any) => state.movieState);

    // console.log('Movie detail', movie)

    async function getData() {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
        )
        console.log('Data api video modal baru', data)
        return data;
    }

    getData();

    return (
        <main>
            <h1>Detail</h1>
        </main>
    )
}

export default Detail