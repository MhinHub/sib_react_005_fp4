import React from 'react'
import { Flag, Star1, Card } from 'iconsax-react'
import Thumbnail from './Thumbnail'
import { memo } from 'react'

const CardItem = ({ movie }: any) => {
    const codeCountry = movie.original_language.toUpperCase()
    const countryName = new Intl.DisplayNames(['en'], { type: 'language' }).of(codeCountry)
    const year = new Date(movie.release_date).getFullYear()

    const truncate = (str: string, n: number = 100) => {
        return str?.length > n ? str.substring(0, n - 1) + '...' : str
    }
    return (
        <div key={movie.id} className={`flex-col group/card pt-3 px-4 h-fit rounded-2xl bg-glass-gray transition duration-500 ease-out md:hover:scale-105`}>
            <Thumbnail movie={movie} styleImg="rounded-t-xl w-full" >
                <p className='absolute font-medium pt-1 text-center bg-glass w-full bottom-0 rounded-b-md'>{movie.title}</p>
            </Thumbnail>
            <p className='flex justify-around my-3'>
                <div className='flex items-center'>
                    <Card className='text-sky-500' variant="Bulk" />
                    <span className='badge-glass-text bg-sky-500 text-sky-400'>
                        {year}
                    </span>
                </div>
                <div className='flex items-center'>
                    <Flag className='text-purple-500' variant="Bulk" />
                    <span className='badge-glass-text bg-purple-500 text-purple-400'>
                        {countryName}
                    </span>
                </div>
                <div className='flex items-center'>
                    <Star1 className='text-yellow-500' variant="Bulk" />
                    <span className='badge-glass-text bg-yellow-500 text-yellow-400'>
                        {`${movie.vote_average} (${movie.vote_count})`}
                    </span>
                </div>
            </p>
            <p className={`text-sm md:hidden group-hover/card:block font-light pb-2 px-1`}>{truncate(movie.overview)}</p>
        </div>
    )
}

export default memo(CardItem)