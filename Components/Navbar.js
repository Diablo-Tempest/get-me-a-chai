"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
  const [toggleProfile, setToggleProfile] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className='flex justify-between items-center list-none gap-5 bg-transparent backdrop-blur-sm text-white h-12 px-3  select-none sticky top-0 z-10'>
      <Link href={'/'} className="logo text-lg font-bold flex justify-center items-center cursor-pointer"><span><Image unoptimized='true' src="/tea.gif" alt="logo" width={50} height={50} /></span>Get me a chai!</Link>
      <div className='flex gap-5 justify-center items-center'>
        {session && <div className="relative">
          <button onClick={() => setToggleProfile(!toggleProfile)} onBlur={() =>
            setTimeout(() => {
              setToggleProfile(false)
            }, 150)
          } id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-800 rounded-full md:me-0" type="button">
            <span className="sr-only">Open user menu</span>
            <Image className="rounded-full" src={session.user.image} width={32} height={32} alt="user photo" />
          </button>

          {/* Dropdown menu */}
          <div id="dropdownAvatar" className={`absolute z-10 ${toggleProfile ? '' : 'hidden'} right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="font-medium truncate select-text">{session?.user?.name}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
              <li>
                <Link href={'/dashboard'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={'/'+session?.user?.name} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Profile</Link>
              </li>
            </ul>
            <div className="py-2" role='button'>
              <span onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
            </div>
          </div>
        </div>}
        {!session && <Link href={'/login'}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2 text-center">Login / Sign up</button>
        </Link>}
      </div>
    </nav>
  )
}

export default Navbar
