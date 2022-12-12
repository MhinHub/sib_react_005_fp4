import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { memo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { SearchNormal1, Profile, Archive } from 'iconsax-react'
import { Dropdown } from 'flowbite-react'

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
    setKeyword('')
  }


  return (
    <header className={`${isScrolled ? 'bg-glass-gray h-[10vh] w-full rounded-md' : 'hidden transition'} transition`}>
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
            className="bg-glass-gray w-48 h-10 md:w-96 rounded-full px-5"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchNormal1 className='text-gray-100 absolute mr-5 group-active/nav:invisible' variant="TwoTone" />
        </form>

        <Link href="/watchlist">
          <Archive className='bg-glass-gray p-2 rounded-full cursor-pointer hover:bg-white/10' size={40} variant="Bold" />
        </Link>

        <Dropdown
          label={<Profile variant='Bulk' size={40} className='bg-glass-gray hover:bg-white/10 p-2 rounded-full' />}
          inline={true}
          arrowIcon={false}
          color="dark"
        >
          <Dropdown.Header>
            <span className="block text-sm">
              Bonnie Green
            </span>
            <span className="block text-sm font-medium truncate">
              bonnie@flowbite.com
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
    </header>
  )
}

export default memo(Header)
