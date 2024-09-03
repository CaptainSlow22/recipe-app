'use client'
import React, { useState, useEffect } from 'react'
import UserCard from '@/components/UserCard'
import RecipeCard from '@/components/RecipeCard'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ForYou() {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const userId = session?.user?.id;


  useEffect(() => {
    if (!userId) return;
  
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/get/getRecipesFromFollowing/${userId}`);
        if (!response.ok) {
          throw new Error("Network response error");
        }
        const data = await response.json();
        setRecipes(data.reverse());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [userId]);
  

  useEffect(() => {
    if (!userId) return;

    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/get/getAllUsers/${userId}`);
        if (!response.ok) {
          throw new Error("Network response error");
        }
        const data = await response.json();
        setUsers(data.users.reverse());

        // Track which users are already followed
        const followed = new Set(data.users.filter(user => user.followers.includes(userId)).map(user => user._id));
        setFollowedUsers(followed);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  const handleFollow = async (followedId) => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/put/addFollower`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerId: userId,
          followedId: followedId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to follow the user');
      }

      // Update UI to reflect the follow action
      setFollowedUsers(prev => new Set(prev).add(followedId));
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === followedId ? { ...user, followers: [...user.followers, userId] } : user
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Calculate total pages
    const totalPages = Math.ceil(recipes.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

  return (
    <div className='p-6 mt-16 md:p-16'>
      <h1 className='mx-auto font-black text-4xl text-center'>For You</h1>
      <div className='mt-24'>
                {currentRecipes.length > 0 ? (
                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16'>
                        {currentRecipes.map(recipe => (
                            <Link key={recipe._id} href={`/dashboard/recipe/${recipe._id}`}>
                                <RecipeCard
                                    key={recipe._id}
                                    imageUrl={recipe.imageUrl}
                                    name={recipe.name}
                                    category={recipe.category}
                                    cookingTime={recipe.cookingTime}
                                    likes={recipe.likedBy.length}
                                />
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>You are not following any users.</p>
                )}
            </div>
            <div className='flex flex-col items-center mt-8'>
                <p className='font-bold md:text-xl'>Page {currentPage}</p>
                <div className='flex justify-center mt-4'>
                    <button 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 1}
                        className={`px-4 py-2 mx-2 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-600 text-white'}`}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 mx-2 rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-600 text-white'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
      <h3 className='mt-8 font-bold text-4xl'>Suggested Users</h3>
      <div className='mt-0'>
        {users.length > 0 ? (
          <ul className='flex h-[370px] md:h-[600px] w-full overflow-x-auto items-center flex-grow-0 gap-x-4'>
            {users.map(user => (
              <div key={user._id} className='flex flex-col items-center'>
                  <UserCard
                    avatar={user.name[0]}
                    name={user.name}
                    followers={user.followers.length}
                    following={user.following.length}
                    onFollow={() => handleFollow(user._id)} // Pass the handleFollow function
                    isFollowed={followedUsers.has(user._id)} // Check if user is followed
                  />
                  <Link key={user._id} href={`/dashboard/user/${user._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mt-4  size-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </Link>
              </div>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
      {loading && (
        <div className='p-16 flex justify-center uppercase font-black text-4xl'>Loading...</div>
      )}
      {error && (
        <div className='p-16 flex justify-center uppercase font-black text-4xl'>Error: {error}</div>
      )}
    </div>
  );
}
