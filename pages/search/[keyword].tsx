import React from 'react'
import CardItem from '@components/molecules/CardItem'
import reqApi from '@utils/reqApi'
import { GetServerSideProps } from 'next'
import { Details } from '@typings'

interface SearchProps {
    movie: Details[]
    keyword: string
    totalResults: number
}

const Search = ({ movie, keyword, totalResults }: SearchProps) => {
    return (
        <main>
            <h1>{totalResults} total Result for "{keyword}"</h1>
            <div className="mx-20 grid grid-cols-3 gap-10">
                {movie.map((movie: any) => (
                    <CardItem key={movie.id} movie={movie} />
                ))}
            </div>
        </main>
    )
}

export default Search

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { keyword }: any = params
    const data = await reqApi.getResultMovies(keyword)
    return {
        props: {
            movie: data.results,
            totalResults: data.total_results,
            keyword,
        },
    }
}
