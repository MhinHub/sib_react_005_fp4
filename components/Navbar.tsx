import { useEffect, useState } from 'react'
import { memo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
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
  const pathname = usePathname()

  const [keyword, setKeyword] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search/${keyword}`)
    setKeyword('')
  }

  return (
    <>
      <header
        className={`${
          isScrolled ? 'opacity-100' : 'opacity-0'
        } bg-glass-gray flex h-[10vh] w-full rounded-md transition-all duration-300 ease-out`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/static/logo-mouvee.png"
            width={80}
            height={80}
            className="cursor-pointer object-contain"
            alt="logo-mouvee"
          />
          <p className="invisible text-2xl font-bold text-gray-100 md:visible">
            Mouvee
          </p>
        </Link>

        <div className="flex items-center space-x-4 text-sm font-light">
          <form
            onSubmit={handleSearch}
            className="group/nav flex items-center justify-end"
          >
            <input
              type="text"
              placeholder="Search movie..."
              className="bg-glass-gray h-10 w-60 rounded-full px-5 md:w-96"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <SearchNormal1
              className="absolute mr-5 text-gray-100 group-active/nav:invisible"
              variant="TwoTone"
            />
          </form>

          <Link href="/watchlist" className="hidden md:block">
            <button className="flex justify-end">
              <Archive
                className="bg-glass-gray cursor-pointer rounded-full p-2 hover:bg-white/10"
                size={40}
                variant="Bold"
              />
              <span className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs font-medium text-white">
                {list.length}
              </span>
            </button>
          </Link>

          <div className="hidden md:block">
            <Dropdown
              label={
                <Profile
                  variant="Bulk"
                  size={40}
                  className="bg-glass-gray rounded-full p-2 hover:bg-white/10"
                />
              }
              inline={true}
              arrowIcon={false}
              color="dark"
            >
              <Dropdown.Header>
                <span className="block text-sm">Signed in as</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Bottom Navigation for Mobile */}
      <nav className="nav-bottom">
        <div className="flex items-center justify-around p-4">
          <button className="flex flex-col items-center justify-center">
            <Link href="/">
              <Home
                variant="Bold"
                size={35}
                className={`${pathname === '/' && 'text-purple-500'}`}
              />
            </Link>
            <span className="text-xs text-gray-100">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center">
            <Link href="/watchlist">
              <Archive
                variant="Bold"
                size={35}
                className={`${pathname === '/watchlist' && 'text-purple-500'}`}
              />
            </Link>
            <span className="text-xs text-gray-100">Watchlist</span>
          </button>
          <button className="flex flex-col items-center justify-center">
            <Link href="/profile">
              <Profile variant="Bold" size={35} className="text-gray-100" />
            </Link>
            <span className="text-xs text-gray-100">Profile</span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default memo(Navbar)
