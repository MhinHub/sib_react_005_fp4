import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { Details, CategoryTypes } from '@typings';
import reqApi from '@utils/reqApi';
import { GetServerSideProps } from 'next';
import ButtonTab from '@components/atoms/ButtonTab';
import CardItem from '@components/molecules/CardItem';

interface CategoryProps {
    movies: Details[];
    categories: CategoryTypes[];
    totalPages?: any;
    id?: number;
    p?: number;
    name: string;
}

export default function Category({ movies, categories, totalPages, id, p, name }: CategoryProps) {

    const [idc, setIdc] = useState(id);
    const [pageActive, setPageActive] = useState<any>(p);

    const router = useRouter();

    // route change page handler
    useEffect(() => {
        if (pageActive > totalPages) {
            setPageActive(totalPages);
        }
        router.push(`/movies/${name}?idc=${idc}&page=${pageActive}`);
    }, [idc, pageActive, totalPages]);


    return (
        <main>
            <h1>Browser by Category</h1>
            {categories.map((category) => (
                <ButtonTab
                    key={category.id}
                    category={category}
                    name={name}
                />
            ))}
            <div className="grid grid-cols-3 gap-10 mx-20">
                {movies.map((movie) => (
                    <CardItem
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={(e) => {
                    const selected = e.selected;
                    setPageActive(selected + 1);
                    setIdc(id);
                }}
                containerClassName={'bg-glass-gray w-max gap-x-4 px-6 py-2 my-10 rounded-full flex justify-center items-center'}
                activeClassName={'bg-purple-500'}
            />
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { idc, page, category: name } = query;
    const id = Number(idc);
    const p = Number(page);

    const dataCategories: any = await reqApi.getCategories();
    const categories = dataCategories?.genres?.filter(
        (genre: CategoryTypes) =>
            genre.name !== 'Romance'
    );

    const dataMovies: any = await reqApi.getCategoryMovies(id, p);
    const movies = dataMovies.results;

    const totalPages = Number(dataMovies.total_pages);

    return {
        props: {
            movies: movies || [],
            categories: categories || [],
            totalPages: totalPages || 1,
            id: id || 0,
            p: p || 0,
            name: name || ''
        }
    };
}