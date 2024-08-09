"use client"

import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {
    const {data: session} = useSession();

  return (
    <div className='w-full mb-16 bg-white p-2 md:p-4 flex flex-row items-center justify-between shadow-xl fixed top-0'>
        <div className='flex flex-row items-center'>
            <h1 className='text-md md:text-4xl text-green-600 ml-2 mr-4 md:ml-10 font-black uppercase' ><Link href="/dashboard">dishjar</Link></h1>
            <Link href="/dashboard/addRecipe" className='px-4 py-1 text-nowrap ml-2 mr-6 md:ml-10 rounded-full bg-green-600 text-white shadow-xl font-bold hover:scale-105 hover:bg-green-400'>+ Add Your Recipe</Link>
        </div>
        <div className='flex flex-row items-center mr-4'>
            <DropdownMenu>
              <DropdownMenuTrigger className='px-5 py-3 bg-gray-200 rounded-full font-bold text-xl capitalize mr-2'>{session?.user?.name[0]}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="capitalize">{session?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href={`/dashboard/profile/${session?.user?.id}`}>My Profile</Link></DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => signOut()}>Sign Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
  )
}

export default Navbar