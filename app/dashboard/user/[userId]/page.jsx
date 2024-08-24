"use client"
import React, {useState, useEffect } from 'react'
import Link from 'next/link';
import RecipeCard from '@/components/RecipeCard';

const UserPage = ({params}) => {
    const {userId} = params;
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchUser = async (userId) => {
          try{
            const response = await fetch(`../../../api/get/getUserById/${userId}`);
            if (!response.ok) {
              throw new Error('Network response error');
            }
            const data = await response.json();
            console.log(data);
            setUser(data[0]);
          } catch(error) {
            setError(error.message);
          }
        }
        fetchUser(userId);
      },[userId])

    useEffect(() => {
        const fetchUserRecipes = async (userId) => {
          try {
            const response = await fetch(`../../../api/get/getRecipesByUserId/${userId}`);
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
    },[userId]);

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
    <div className='mt-16 p-16 bg-gray-100'>
        <div className='flex items-center space-x-2'>
            <div className='capitalize font-bold text-4xl bg-gray-100 px-4 py-2 rounded-full border-4 border-green-600'>{user?.name[0]}</div>
            <h1 className='font-bold text-4xl text-left'>{user?.name}&apos;s Recipes</h1>
        </div>
        <div className='mt-24 '>
            {currentRecipes.length > 0 ? (
                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16'>
                        {currentRecipes.map(recipe => (
                            <Link key={recipe._id} href={`/dashboard/${recipe._id}`}>
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
                    <p>No recipes found.</p>
                )}
            </div>
        {loading && (
                <div className='p-16  flex justify-center uppercase font-black text-4xl'>Loading...</div>
        )}
        {error && (
            <div className='p-16  flex justify-center uppercase font-black text-4xl'>Error: {error}</div>
        )}
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
    </div>
  )
}

export default UserPage