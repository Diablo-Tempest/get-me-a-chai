"use client"
import React, { useEffect, useState } from 'react'
import { fetchUser } from '@/app/actions/userActions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard - Get Me A Chai',
  description: 'Dashboard page for the user of Get Me A Chai website',
}

const Dashboard = () => {
  const [form, setForm] = useState({})
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (!session) {
      router.push("/", undefined, { shallow: true })
    }
    const getData = async () => {
      let user = await fetchUser(session?.user?.name)
      setForm(user)
    }
    getData()

  }, [router, session, session?.user?.name])

  return (
    <div>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="text" value={form?.email || ''} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john@example.com" readOnly />
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" value={form?.name || ''} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" readOnly />
        </div>
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input type="text" value={form?.username || ''} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe" readOnly />
        </div>
        <div className='flex justify-between'>
          <div className="mb-5">
            <label htmlFor="phnumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Moblie Number</label>
            <input type="text" value={form?.phnumber || ''} id="phnumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9xxxxxxxxx" readOnly />
          </div>
          <div className="mb-5">
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
            <input type="text" value={form?.company || ''} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example Inc" readOnly />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className="mb-5">
            <label htmlFor="razorpay_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
            <input type="password" value={form?.razorpay_id || ''} id="razorpay_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Razorpay ID" readOnly />
          </div>
          <div className="mb-5">
            <label htmlFor="razorpay_secret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
            <input type="password" value={form?.razorpay_secret || ''} id="razorpay_secret" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="razorpay Secret" readOnly />
          </div>
        </div>

        <Link href={'/dashboard/edit'}>
          <button disabled={!form} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-lg rounded-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-800">{!form ? 'Loading...' : 'Edit'}</button>
        </Link>
      </form>

    </div>
  )
}

export default Dashboard
