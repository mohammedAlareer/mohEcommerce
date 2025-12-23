import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Searchbar from './Searchbar'
import { Bell, Home, ShoppingCartIcon } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className='w-full flex items-center justify-between border-b border-gray-200 pb-4 mb-2'>
        <Link href='' className='flex items-center gap-2'>
            <Image
            src='/logo (1).png'
            alt="logo"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
            />
            <p className='hidden md:block text-md font-medium tracking-wider'>  MOHAMMED.</p>
        </Link>
        
        <div className="flex items-center gap-6">
        <Searchbar />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600"/>
        </Link>
        <Bell className="w-4 h-4 text-gray-600"/>
        <ShoppingCartIcon/>
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
)
}
