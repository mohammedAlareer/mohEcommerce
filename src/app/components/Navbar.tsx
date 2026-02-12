import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Searchbar from './Searchbar'
import { ArrowRight, Bell, Home } from 'lucide-react'
import ShoppingCartIcon from './ShoppingCartIcon'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

export default async function Navbar() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className='w-full flex items-center justify-between border-b border-gray-200 pb-4 mb-2'>
        <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/logo (1).png'
              alt="logo"
              width={36}
              height={36}
              className="w-6 h-6 md:w-9 md:h-9"
            />
            <p className='hidden md:block text-md font-medium tracking-wider'>MOHAMMED.</p>
        </Link>
        
        <div className="flex items-center gap-6">
          <Searchbar />
          <Link href="/">
            <Home className="w-4 h-4 text-gray-600"/>
          </Link>
          <Bell className="w-4 h-4 text-gray-600"/>
          <ShoppingCartIcon/>
          
          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Link href='/api/auth/logout' className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}>
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link 
                    href='/dashboard' 
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    Dashboard ✨
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <Link href='/api/auth/register?redirectTo=/' className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}>
                  Sign up
                </Link>

                <Link href='/api/auth/login' className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
    </nav>
  )
}