"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import UserCard from '@/components/UserCard';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';

const ProfilePage = ({params}) => {
  const {userId} = params;
  const {data: session} = useSession();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete/deleteRecipe/${recipeId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    const fetchUserRecipes = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/get/getRecipesByUserId/${userId}`);
        console.log(userId);
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
    <div className='p-16 mt-16 bg-gray-100'>
     <h1 className='mt-8 flex justify-center text-center uppercase font-black text-4xl'>My Profile</h1>
     <UserCard avatar={session?.user?.name[0]} name={session?.user?.name} email={session?.user?.email}/>
     <h1 className='mt-8 text-4xl font-bold p-6'>My Recipes</h1>
     <div className='mt-0 '>
            {recipes.length > 0 ? (
                    <ul className='flex h-[500px] w-full overflow-x-auto items-center flex-grow-0 gap-x-4'>
                        {recipes.map(recipe => (
                          <div className='flex flex-col items-center'>
                            <Link key={recipe._id} href={`/dashboard/${recipe._id}`}>
                                <RecipeCard
                                key={recipe._id}
                                imageUrl={recipe.imageUrl}
                                name={recipe.name}
                                category={recipe.category}
                                cookingTime={recipe.cookingTime}
                                likes={recipe.likes}
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