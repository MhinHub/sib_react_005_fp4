import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import reqApi from '@utils/reqApi';
import CardItem from '../molecules/CardItem';
import ButtonTab from '../atoms/ButtonTab';
import { CategoryTypes, Details } from '@typings';
import RowFill from '../RowFill';

const RowCategory = ({ categories, categoryMovies, name }: any) => {
    return (
        <div className="section-category container-xxxl mt-0 mt-lg-5">
            <div className="button-wrapper mb-4">
                {/* {categories.map((category: CategoryTypes) => (
                    <ButtonTab
                        key={category.id}
                        category={category}
                        name={name}
                    />
                ))} */}
            </div>
            <div className="category-wrapper scroll-wrapper pb-5">
                <RowFill
                    title="Browse by category"
                    tabs={categories}
                    movies={categoryMovies}
                />
            </div>
        </div>
    );
}

export default RowCategory;