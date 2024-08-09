import React from 'react'

const RecipeCard = ({name, imageUrl, category, cookingTime, likes }) => {
  return (
    <li className='mb-4 border rounded-2xl shadow-lg bg-white'>
            <div className='flex justify-center'>
                <img src={imageUrl} alt={name} className='-mt-12 w-48 h-48 border-8 border-white object-cover rounded-full' />
            </div>
            <div className='p-4 flex flex-col items-center'>
                <h2 className="text-2xl font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap w-full text-center">{name}</h2>
                <p className='mb-2 bg-green-600 rounded-full px-3 py-1 text-white inline-block justify-center'>{category}</p>
                <div className='flex space-x-16 mt-2'>
                    <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className='uppercase font-bold'><strong>{cookingTime} min</strong></p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" color='red' className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <p className='uppercase font-bold text-red-600'><strong>{likes}</strong></p>
                    </div>
                </div>
            </div>
    </li>
  )
}

export default RecipeCard