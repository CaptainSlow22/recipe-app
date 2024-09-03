import React from 'react'

const ProfileCard = ({avatar, name, email, followers, following}) => {
  return (
    <div className='p-6 md:p-16 w-full lg:w-[70%] mt-8 rounded-2xl shadow-xl bg-gradient-to-tr from-green-500 to-green-700 flex flex-col items-center justify-center space-y-4 md:space-y-10'>
        <div className='px-5 py-2 md:px-8 md:py-3 border-4 md:border-8 flex justify-center bg-gray-200 rounded-full font-bold text-6xl md:text-9xl capitalize'>
            {avatar}
        </div>
        <div>
            <p className='text-md md:text-3xl font-bold capitalize text-white text-center'>{name}</p>
            <p className='text-md md:text-3xl font-bold text-white text-center'>{email}</p>
            <div className='flex mt-4 justify-center text-center space-x-6'>
              <div className='font-bold text-white text-md md:text-xl'>
                <p>{followers}</p>
                <p>Folowers</p>
              </div>
              <div className='font-bold text-white text-md md:text-xl'>
                <p>{following}</p>
                <p>Following</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard