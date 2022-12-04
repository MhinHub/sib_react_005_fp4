import Link from 'next/link';
import { CategoryTypes } from '@typings';

interface ButtonTabProps {
    category: CategoryTypes;
    name?: string;
}


export default function ButtonTab({ category, name }: ButtonTabProps) {
    const isActive = name === category.name;

    return (
        <Link href={{
            pathname: `/movies/[category]`,
            query: {
                category: category.name,
                idc: category.id,
                page: 1
            }
        }}>
            <button className={isActive ? 'bg-purple-500' : ''}>
                {category.name}
            </button>
        </Link>
    )
}
