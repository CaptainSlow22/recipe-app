"use client"
import LikeButton from '@/components/LikeButton';
import React, { useEffect, useState } from 'react';

const RecipePage =  ({ params }) => {
  const { id } = params;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/get/getAllRecipes/${id}`); 
            if (!response.ok) {
                throw new Error('Network response error');
            }
            const data = await response.json();
            setRecipe(data.recipe);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchRecipe(id);
  },[])

  console.log(recipe);

  if (loading) {
    return <div className='p-16 flex justify-center uppercase font-black text-4xl'>Loading...</div>;
  }

  if (error) {
    return <div className='p-16 flex justify-center uppercase font-black text-4xl'>Error: {error}</div>;
  }

  return (
    <div className='mt-16 px-4 py-16 md:px-32 md:py-32'>
        <div className='bg-white p-16 flex flex-col items-center space-y-2'>
            <div className='flex justify-center'>
                <img className='-mt-28 md:-mt-32 h-48 w-48 md:w-72 md:h-72 border-8 border-white object-cover rounded-full' src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <div className='flex flex-col items-center space-y-2'>
                <h1 className='text-5xl text-center font-bold'>{recipe.name}</h1>
                <p className='mb-2 bg-green-600 rounded-full px-3 py-1 text-white inline-block justify-center'>{recipe.category}</p>
                <div className='flex space-x-16 mt-2'>
                    <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className='uppercase font-bold'><strong>{recipe.cookingTime} min</strong></p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" color='red' className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <p className='uppercase font-bold text-red-600'><strong>{recipe.likes}</strong></p>
                    </div>
                </div>
            </div>
            <h1 className='text-3xl flex self-start font-bold'> Directions:</h1>
            <p className='text-md md:text-xl font-bold flex self-start text-left text-balance'>{recipe.description}</p>
            <div className='flex p-6'>
                <LikeButton recipeId={id} initialLikes={recipe.likes} />
            </div>
        </div>
    </div>
  );
};

export default RecipePage;
