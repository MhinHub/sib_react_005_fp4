import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='flex w-screen relative -z-10 bottom-0 mt-10'>
            <div className="flex justify-center items-center py-4 mx-auto">
                <p className="text-sm text-gray-400">© {year} Mouvee - All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer