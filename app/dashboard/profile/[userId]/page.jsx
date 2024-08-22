"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ProfileCard from '@/components/ProfileCard';
import RecipeCard from '@/components/RecipeCard';
import UserCard from '@/components/UserCard';
import Link from 'next/link';
import FollowingCard from '@/components/FollowingCard';

const ProfilePage = ({params}) => {
  const {userId} = params;
  const {data: session} = useSession();
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedRecipes = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/get/getLikedRecipes/${userId}`);
        if(!response.ok) {
          throw new Error("Network response error");
        }
        const data = await response.json();
        setLikedRecipes(data);
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLikedRecipes(userId);
  },[userId])

  useEffect(() => {
    const fetchUser = async (userId) => {
      try{
        const response = await fetch(`http://localhost:3000/api/get/getUserById/${userId}`);
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const data = await response.json();
        setUser(data[0]);
      } catch(error) {
        setError(error.message);
      }
    }
    fetchUser(userId);
  },[userId])

  useEffect(() => {
    const fetchFollowing = async (userId) => {
      try{
        const response = await fetch(`http://localhost:3000/api/get/getFollowing/${userId}`);
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const data = await response.json();
        setFollowing(data.reverse());
      } catch(error) {
        setError(error.message);
      }
    }
    fetchFollowing(userId);
  },[userId])

  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete/deleteRecipe/${recipeId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete/deleteLike`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId, userId }),
      });

      if(response.ok) {
        setLikedRecipes((prevLikedRecipes) => prevLikedRecipes.filter((recipe) => recipe._id !== recipeId))
      }

    } catch(error) {
      console.log(error);
    }
  }
  
  const handleUnfollow = async (followedId) => {
    if (!userId) return;
  
    try {
      const response = await fetch(`http://localhost:3000/api/delete/deleteFollower`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerId: userId,
          followedId: followedId,
        }),
      });
  
      if (response.ok) {
        setFollowing((prevFollowing) =>
          prevFollowing.filter(user => user._id !== followedId)
        );
      } else {
        throw new Error('Failed to unfollow the user');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  useEffect(() => {
    const fetchUserRecipes = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/get/getRecipesByUserId/${userId}`);
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const data = await response.json();
        setRecipes(data.recipes.reverse());
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRecipes(userId);    
  },[]);

  
  return (
    <div className='p-6 md:p-16 mt-16 bg-gray-100'>
     <h1 className='mt-8 flex justify-center text-center uppercase font-black text-4xl'>My Profile</h1>
     <ProfileCard avatar={session?.user?.name[0]} name={session?.user?.name} email={session?.user?.email} followers={user?.followers?.length} following={user?.following?.length} />
     <h1 className='mt-8 text-4xl font-bold p-6'>My Recipes</h1>
     <div className='mt-0 '>
            {recipes.length > 0 ? (
                    <ul className='flex h-[500px] w-full overflow-x-auto items-center flex-grow-0 gap-x-4'>
                        {recipes.map(recipe => (
                          <div className='flex flex-col items-center'>
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
                            <button onClick={() => handleDelete(recipe._id)} className='px-3 py-1 bg-red-500 text-white rounded-full'>Delete</button>
                          </div>  
                        ))}
                    </ul>
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
            <h1 className='mt-8 text-4xl font-bold p-6'>Liked Recipes</h1>
            <div className='mt-0 '>
            {likedRecipes.length > 0 ? (
                    <ul className='flex h-[500px] w-full overflow-x-auto items-center flex-grow-0 gap-x-4'>
                        {likedRecipes.map(recipe => (
                          <div className='flex flex-col items-center'>
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
                            <button onClick={() => handleUnlike(recipe._id)} className='px-3 py-1 bg-red-500 text-white rounded-full'>Unlike</button>
                          </div>  
                        ))}
                    </ul>
                ) : (
                    <p>No liked recipes.</p>
                )}
            </div>
            <h1 className='mt-8 text-4xl font-bold p-6'>Following</h1>
            <div className='-mt-8 '>
            {following.length >= 0 ? (
                    <ul className='flex h-[300px] md:h-[550px] w-full overflow-x-auto items-center flex-grow-0 gap-x-4'>
                        {following.map(follow => (
                          <div className='flex flex-col items-center'>
                            <Link key={follow._id} href={`/dashboard/user/${follow._id}`}>
                              <FollowingCard
                                  key={follow._id}
                                  avatar={follow.name[0]}
                                  name={follow.name}
                                  followers={follow.followers.length}
                                  following={follow.following.length}
                              />
                            </Link>
                            <button onClick={() => handleUnfollow(follow._id)} className='mt-4 px-3 py-1 bg-gray-500 text-white rounded-full'>
                              Unfollow
                            </button>
                          </div>  
                        ))}
                    </ul>
                ) : (
                    <p>You don't follow any users.</p>
                )}
            </div>

     {loading && (
        <div className='p-16  flex justify-center uppercase font-black text-4xl'>Loading...</div>
     )}
    {error && (
      <div className='p-16  flex justify-center uppercase font-black text-4xl'>Error: {error}</div>
    )}
    </div>
  )
}

export default ProfilePage