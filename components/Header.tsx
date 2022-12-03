import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import { SearchNormal1 } from 'iconsax-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import BasicMenu from './molecules/BasicMenu'
import { memo } from 'react'
import { useRouter } from 'next/navigation'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search/${keyword}`)
  }


  return (
    <header className={`${isScrolled ? 'bg-glass-gray h-[10vh] w-full rounded-md' : 'hidden transition'} transition`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <BasicMenu />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <form onSubmit={handleSearch} className="flex group items-center justify-end">
          <input
            type="text"
            placeholder="Search movie..."
            className="bg-glass-gray w-96 h-10 rounded-full px-5"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchNormal1 className='text-gray-100 absolute mr-5 group-active:invisible' variant="TwoTone" />
        </form>
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        />
      </div>
    </header>
  )
}

export default memo(Header)
