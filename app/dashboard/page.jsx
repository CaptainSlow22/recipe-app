"use client";

import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchInput, setSearchInput] = useState('');  // New state for search input
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('/api/get/getAllRecipes');
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                const data = await response.json();
                setRecipes(data.recipes.reverse());
                setFilteredRecipes(data.recipes);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        applyFilter(filter);
        setCurrentPage(1); // Reset to first page when filter changes
    }, [filter, recipes]);

    const applyFilter = (filter) => {
        let filtered = [...recipes];

        switch (filter) {
            case 'mostLiked':
                filtered = filtered.sort((a, b) => b.likedBy.length - a.likedBy.length);
                break;
            case 'quickest':
                filtered = filtered.sort((a, b) => a.cookingTime - b.cookingTime);
                break;
            case 'asian':
            case 'french':
            case 'greek':
            case 'indian':
            case 'italian':
            case 'mexican':
            case 'middle eastern':
            case 'western':
                filtered = filtered.filter(recipe => recipe.category.toLowerCase() === filter);
                break;
            case 'all':
            default:
                filtered = recipes;
                break;
        }

        setFilteredRecipes(filtered);
    };

    const handleSearch = async () => {
        if (!searchInput) {
            setFilteredRecipes(recipes);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/get/search?search=${encodeURIComponent(searchInput)}`);
            if (!response.ok) {
                throw new Error('Network response error');
            }
            const data = await response.json();
            setFilteredRecipes(data.reverse());
            setCurrentPage(1); // Reset to first page when search is performed
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Calculate recipes to display on the current page
    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Calculate total pages
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    if (loading) {
        return <div className='p-16 mt-16 flex justify-center uppercase font-black text-4xl'>Loading...</div>;
    }

    if (error) {
        return <div className='p-16 mt-16 flex justify-center uppercase font-black text-4xl'>Error: {error}</div>;
    }

    return (
        <div className='p-6 md:p-16 bg-gray-100 mt-16'>
            <h1 className='mt-8 flex justify-center text-center uppercase font-black text-4xl'>Explore Recipes</h1>
            <div className="mt-8 flex w-full justify-center space-x-2">
                <Input type="search" placeholder="Search for an ingredient..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}/>
                <Button type="submit" onClick={handleSearch}>Search</Button>
            </div>
            <div className='flex lg:justify-center w-full overflow-x-auto whitespace-nowrap gap-x-4 mt-8'>
                <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'all' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('mostLiked')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'mostLiked' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Most Liked
                </button>
                <button
                    onClick={() => setFilter('quickest')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'quickest' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Quickest
                </button>
                <button
                    onClick={() => setFilter('asian')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'asian' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Asian
                </button>
                <button
                    onClick={() => setFilter('french')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'french' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    French
                </button>
                <button
                    onClick={() => setFilter('greek')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'greek' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Greek
                </button>
                <button
                    onClick={() => setFilter('indian')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'indian' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Indian
                </button>
                <button
                    onClick={() => setFilter('italian')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'italian' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Italian
                </button>
                <button
                    onClick={() => setFilter('mexican')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'mexican' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Mexican
                </button>
                <button
                    onClick={() => setFilter('middle eastern')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'middle eastern' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Middle Eastern
                </button>
                <button
                    onClick={() => setFilter('western')}
                    className={`px-3 py-1 rounded-full ${
                        filter === 'western' ? 'bg-white text-green-600 border-2 border-green-600' : 'bg-green-600 text-white'
                    }`}
                >
                    Western
                </button>
            </div>
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
                    <p>No recipes found.</p>
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
        </div>
    );
};

export default Dashboard;
