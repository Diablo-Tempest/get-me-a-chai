"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Home() {
  const {data: session} = useSession()
  return (
    <div className="divide-y-2 divide-slate-800">
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <div className="font-bold text-5xl flex justify-center items-center"><span>Buy me a chai</span> <span><Image unoptomized="true" src='/tea.gif' alt="logo" width={100} height={100} /></span></div>
        <div className="flex flex-col items-center">
          <p>A crowd funding platform for creators. Get funded by your fans and followers. Start now!</p>
          <div>
            <Link href={session?`/${session.user.name}`:"/login"}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:outline-none">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 text-white rounded-md group-hover:bg-opacity-0">Start here</span>
            </button>
            </Link>
            <Link href={"/about"}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 text-white rounded-md group-hover:bg-opacity-0">Read more</span>
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-white container mx-auto my-5">
        <h2 className="text-2xl font-bold text-center my-10">Your fans can buy you a chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="flex flex-col justify-center items-center item space-y-3 w-1/3">
            <Image unoptomized="true" className="bg-slate-400 rounded-full p-5" src="/man.gif" alt="" width={100} height={100} />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available for you to help</p>
          </div>
          <div className="flex flex-col justify-center items-center item space-y-3 w-1/3">
            <Image unoptomized="true" className="bg-slate-400 rounded-full p-5" src="/coin.gif" alt="" width={100} height={100} />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available for you to help</p>
          </div>
          <div className="flex flex-col justify-center items-center item space-y-3 w-1/3">
            <Image unoptomized="true" className="bg-slate-400 rounded-full p-5" src="/group.gif" alt="" width={100} height={100} />
            <p className="font-bold">Fans wants to help</p>
            <p className="text-center">Your fans are available for you to help</p>
          </div>
        </div>
      </div>
      <div className="text-white container mx-auto">
        <h2 className="text-2xl font-bold text-center my-10">Learn more about Us</h2>
        <div className="flex gap-5 justify-around">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=XUexQXfEjVEKyq9M" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}
