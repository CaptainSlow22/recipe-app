import React from 'react'

const UserCard = ({avatar, name, email}) => {
  return (
    <div className='p-4 md:p-16 mt-8 rounded-2xl shadow-xl bg-white flex space-x-4 md:space-x-10 justify-center items-center'>
        <div className='px-3 py-1 md:px-8 md:py-3 border-4 md:border-8 border-green-600 bg-gray-200 rounded-full font-bold text-2xl md:text-9xl capitalize mr-2'>
            {avatar}
        </div>
        <div>
            <p className='text-md md:text-3xl font-bold capitalize'>{name}</p>
            <p className='text-md md:text-3xl font-bold'>{email}</p>
        </div>
    </div>
  )
}

export default UserCard