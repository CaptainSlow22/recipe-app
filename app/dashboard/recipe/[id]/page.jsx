'use client';

import React, { useEffect, useState } from 'react';
import LikeButton from '@/components/LikeButton';
import { useSession } from 'next-auth/react';

const RecipePage = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialIsLiked, setInitialIsLiked] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/get/getAllRecipes/${id}`);
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const data = await response.json();
        setRecipe(data.recipe);

        if (userId && data.recipe.likedBy.includes(userId)) {
          setInitialIsLiked(true);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecipe();
    }
  }, [id, userId]);

  const handleLikeUpdate = (newLikesCount) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      likedBy: Array(newLikesCount).fill('liked'),
    }));
  };

  if (loading) {
    return <div className="p-16 mt-16 flex justify-center uppercase font-black text-4xl">Loading...</div>;
  }

  if (error) {
    return <div className="p-16 mt-16 flex justify-center uppercase font-black text-4xl">Error: {error}</div>;
  }

  return (
    <div className="mt-16 px-4 md:px-16">
      <div className="flex flex-col p-6 md:p-16 items-center space-y-2">
        <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-28">
          <div className="flex justify-center items-center">
            <img
              className="h-56 w-56 md:w-96 md:h-96 border-8 border-green-600 object-cover rounded-full"
              src={recipe.imageUrl}
              alt={recipe.name}
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-4xl md:text-6xl text-center font-black">{recipe.name}</h1>
            <p className="mb-2 bg-green-600 rounded-full px-3 py-1 text-white inline-block justify-center">{recipe.category}</p>
            <div className="flex space-x-16 mt-2">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="uppercase font-bold">
                  <strong>{recipe.cookingTime} min</strong>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  color="red"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <p className="uppercase font-bold text-red-600">
                  <strong>{recipe.likedBy.length}</strong>
                </p>
              </div>
            </div>
            <div className="flex p-6">
              <LikeButton
                recipeId={id}
                initialLikes={recipe.likedBy.length}
                initialIsLiked={initialIsLiked}
                onLike={handleLikeUpdate}
              />
            </div>
          </div>
        </div>
        <div className="text-left justify-center flex flex-col">
          <h1 className="mt-10 md:mt-20 text-4xl md:text-6xl flex text-center justify-center font-bold">🧑‍🍳 Directions</h1>
          <div className="mt-10 md:mt-20">
            {recipe.description.split('\n').map((line, index) => (
              <p
                key={index}
                className="text-md md:text-xl font-bold flex self-start text-left"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
