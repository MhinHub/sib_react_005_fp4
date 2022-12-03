import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='bottom-0'>
            <div className="flex justify-center items-center py-4">
                <p className="text-sm text-gray-400">© {year} Mouvee - All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer