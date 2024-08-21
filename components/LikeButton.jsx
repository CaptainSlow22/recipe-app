'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

function LikeButton({ recipeId, initialLikes }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const userId = session?.user?.id;

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!userId) return;  
      
      try {
        const res = await fetch(`http://localhost:3000/api/get/getAllRecipes/${recipeId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const recipe = await res.json();
        const likedBy = recipe.likedBy || [];

        setIsLiked(likedBy.includes(userId));
      } catch (error) {
        console.error(error.message);
      }
    };

    checkIfLiked();
  }, [recipeId, userId]);

  const handleLike = async () => {
    if (isLiked) return; 

    try {
      const res = await fetch(`http://localhost:3000/api/put/likeRecipe/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error('Failed to update likes');
      }

      const updatedRecipe = await res.json();
      setLikes(updatedRecipe.likedBy.length);
      setIsLiked(true);  // Disable the button after pressing
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiked}
      className={`px-8 py-3 text-xl rounded-2xl ${isLiked ? "bg-gray-300 text-gray-700" : "bg-red-500 text-white"}`}
    >
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
}

export default LikeButton;
