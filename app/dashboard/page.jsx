"use client"

import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('/api/get/getAllRecipes'); 
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                const data = await response.json();
                setRecipes(data.recipes.reverse());
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <div className='p-16 mt-16 flex justify-center uppercase font-black text-4xl'>Loading...</div>;
    }

    if (error) {
        return <div className='p-16 mt-16 flex justify-center uppercase font-black text-4xl'>Error: {error}</div>;
    }

    return (
        <div className='p-16 bg-gray-100 mt-16'>
            <h1 className='mt-8 flex justify-center text-center uppercase font-black text-4xl'>Explore Recipes</h1>
            <div className='mt-24'>
            {recipes.length > 0 ? (
                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16'>
                        {recipes.map(recipe => (
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
                        ))}
                    </ul>
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
