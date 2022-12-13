import { useEffect, useState } from 'react'
import { memo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { SearchNormal1, Profile, Archive, Home } from 'iconsax-react'
import { Dropdown } from 'flowbite-react'
import { AnimatePresence, motion } from 'framer-motion'
import useList from '@hooks/useList'
import useAuth from '@hooks/useAuth'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout, user } = useAuth()

  const list = useList(user?.uid)

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
    setKeyword('')
  }

  return (
    <>
      <header className={`${isScrolled ? 'bg-glass-gray h-[10vh] w-full rounded-md' : 'hidden transition'} transition ease-in-out duration-75`}>
        <Link href="/" className="flex items-center">
          <Image
            src="/static/logo-mouvee.png"
            width={80}
            height={80}
            className="cursor-pointer object-contain"
            alt='logo-mouvee'
          />
          <p className="text-2xl font-bold text-gray-100 invisible md:visible">Mouvee</p>
        </Link>

        <div className="flex items-center space-x-4 text-sm font-light">
          <form onSubmit={handleSearch} className="flex group/nav items-center justify-end">
            <input
              type="text"
              placeholder="Search movie..."
              className="bg-glass-gray w-60 h-10 md:w-96 rounded-full px-5"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <SearchNormal1 className='text-gray-100 absolute mr-5 group-active/nav:invisible' variant="TwoTone" />
          </form>

          <Link href="/watchlist" className='hidden md:block'>
            <button className='flex justify-end'>
              <Archive className='bg-glass-gray p-2 rounded-full cursor-pointer hover:bg-white/10' size={40} variant="Bold" />
              <span className="flex absolute justify-center items-center w-4 h-4 text-xs font-medium p-2 text-white bg-red-500 rounded-full">{list.length}</span>
            </button>
          </Link>

          <div className='hidden md:block'>
            <Dropdown
              label={<Profile variant='Bulk' size={40} className='bg-glass-gray hover:bg-white/10 p-2 rounded-full' />}
              inline={true}
              arrowIcon={false}
              color="dark"
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  Signed in as
                </span>
                <span className="block text-sm font-medium truncate">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={logout}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>

        </div>
      </header>

      {/* Bottom Navigation for Mobile */}
      <nav className="nav-bottom">
        <div className="flex items-center justify-around p-4">
          <button className="flex flex-col items-center justify-center">
            <Link href="/">
              <Home variant="Bold" size={35} className={`text-gray-100 ${router.pathname === '/' && 'text-purple-500'}`} />
            </Link>
            <span className="text-xs text-gray-100">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center">
            <Link href="/watchlist">
              <Archive variant="Bold" size={35} className={`text-gray-100 ${router.pathname === '/watchlist' && 'text-purple-500'}`} />
            </Link>
            <span className="text-xs text-gray-100">Watchlist</span>
          </button>
          <button className="flex flex-col items-center justify-center">
            <Link href="/profile">
              <Profile variant="Bold" size={35} className='text-gray-100' />
            </Link>
            <span className="text-xs text-gray-100">Profile</span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default memo(Navbar)
