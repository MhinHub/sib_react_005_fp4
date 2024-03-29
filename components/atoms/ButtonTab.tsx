import Link from 'next/link'
import { CategoryTypes } from '@typings'

interface ButtonTabProps {
  category: CategoryTypes
  name?: string
  isMovie?: boolean
}

export default function ButtonTab({
  category,
  name,
  isMovie = false,
}: ButtonTabProps) {
  const isActive = name === category.name

  return (
    <div className="">
      <Link
        className={`flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-full bg-[#1f1f1f] px-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#2f2f2f] ${
          isActive ? 'bg-purple-500' : ''
        }`}
        href={{
          pathname: isMovie ? `/movies/[category]` : ``,
          query: {
            category: category.name,
            idc: category.id,
            page: 1,
          },
        }}
      >
        <button>{category.name}</button>
      </Link>
    </div>
  )
}
