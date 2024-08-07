"use client"

import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    const {data: session} = useSession();

  return (
    <div className='bg-gradient-to-l from-green-700 to-green-500 p-8 flex flex-row items-center justify-between shadow-xl'>
        <div className='flex flex-row items-center'>
            <h1 className='text-4xl text-white ml-10 font-black uppercase' >Recipe app dashboard</h1>
            <Link href="/dashboard/addRecipe" className='px-4 ml-10 py-1 rounded-full bg-white shadow-xl font-bold hover:scale-105 hover:bg-gray-100'>+ Add Your Recipe</Link>
        </div>
        <div className='flex flex-row items-center'>
            <div className='px-5 py-3 bg-gray-200 rounded-full font-bold text-xl capitalize mr-2'>{session?.user?.name[0]}</div>
            <p className='text-white text-xl capitalize mr-8'>{session?.user?.name}</p>
            <button onClick={() => signOut()} className='text-xl bg-white rounded-xl shadow-xl hover:bg-gray-100 hover:scale-105 p-4 font-bold '>Sign Out</button>
        </div>
    </div>
  )
}

export default Navbar