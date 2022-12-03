import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import MovieItem from '@/components/molecules/MovieItem';
import Footer from '@/components/organisms/Footer';
import Navbar from '@/components/organisms/Navbar';

interface CategoryProps {
    movies: Detail[];
    categories: CategoryTypes[];
    totalPages: number;
    id: number;
    p: number;
    catActive: string;
}

export default function Category() {
    const { movies, categories, totalPages, id, p, catActive } = props;

    const [active, setActive] = useState(catActive);
    const [idc, setIdc] = useState(id);
    const [pageActive, setPageActive] = useState(p);
    const router = useRouter();

    useEffect(() => {
        if (pageActive > totalPages) {
            setPageActive(totalPages);
        }
        router.push(`/movies/category?idc=${idc}&cat=${active}&page=${pageActive}`);
    }, [idc, pageActive, totalPages]);
    return (
        <div>
            <h1>Category</h1>
        </div>
    )
}

export async function getServerSideProps({ query }: GetServerSideProps) {
    const { idc, page, cat: catActive } = query;
    const id = Number(idc);
    const p = Number(page);

    const dataCategories: any = await getCategories();
    const categories = dataCategories?.genres?.filter(
        (genre: CategoryTypes) =>
            genre.name !== 'Romance'
    );

    const dataMovies: any = await getCategoryMovies(id, p);
    const movies = dataMovies.results;

    const totalPages = Number(dataMovies.total_pages);

    return { props: { movies, categories, totalPages, id, p, catActive } };
}