import React from 'react'

const UserCard = ({avatar, name, email}) => {
  return (
    <div className='p-4 md:p-16 mt-8 rounded-2xl shadow-xl bg-white flex flex-col items-center justify-center space-y-4 md:space-y-10'>
        <div className='px-5 py-2 md:px-8 md:py-3 border-4 md:border-8 flex justify-center border-green-600 bg-gray-200 rounded-full font-bold text-6xl md:text-9xl capitalize'>
            {avatar}
        </div>
        <div>
            <p className='text-md md:text-3xl font-bold capitalize text-center'>{name}</p>
            <p className='text-md md:text-3xl font-bold text-center'>{email}</p>
            <div className='flex mt-4 justify-center text-center space-x-6'>
              <div className='font-bold text-md md:text-xl'>
                <p>0</p>
                <p>Folowers</p>
              </div>
              <div className='font-bold text-md md:text-xl'>
                <p>0</p>
                <p>Following</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard