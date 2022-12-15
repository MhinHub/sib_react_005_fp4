import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='flex w-screen relative bottom-0 mt-10'>
            <div className="flex justify-center items-center py-4 mx-auto text-sm text-gray-400 gap-x-6">
                <p className="">© {year} Mouvee</p>
                <span>|</span>
                <Link href="/about-dev" className='hover:underline cursor-pointer'>
                    About Dev
                </Link>
            </div>
        </footer>
    )
}

export default Footer