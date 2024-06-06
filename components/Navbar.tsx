import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'

const navIcons = [
    {
        src: '/assets/icons/heart.svg', alt: 'wishlist', link: '/wishlist'
    },
    {
        src: '/assets/icons/user.svg', alt: 'profile', link: '/profile'
    }
]

export default function Navbar() {
  return (
    <header className='w-full'>
        <nav className='nav'>
            <Link href='/' className='flex items-center gap-1'>
                <Image src={'/assets/icons/logo.svg'} width={40} height={40} alt='logo' />
                <p className='nav-logo'>
                    Price <span className='text-primary'>Tracker</span>
                </p>
            </Link>
            <div className='flex items-center gap-4'>
                <SearchBar />
                {navIcons.map((icon, index) => (
                    <Link href={icon.link} key={icon.alt}>
                        <Image
                            src={icon.src} 
                            className='object-contain'
                            width={26} 
                            height={26} 
                            alt={icon.alt} />
                    </Link>
                ))}
            </div>
        </nav>
    </header>
  )
}
