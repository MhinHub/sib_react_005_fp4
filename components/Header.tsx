import { SearchNormal1 } from 'iconsax-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { memo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
      <div className="flex items-center">
        <Image
          src="/static/logo-mouvee.png"
          width={80}
          height={80}
          className="cursor-pointer object-contain"
          alt='logo-mouvee'
        />
        <p className="text-2xl font-bold text-gray-100 invisible md:visible">Mouvee</p>
      </div>

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
