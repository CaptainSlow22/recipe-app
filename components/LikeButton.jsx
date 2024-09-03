'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

function LikeButton({ recipeId, initialLikes, initialIsLiked, onLike }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const userId = session?.user?.id;

  const handleLike = async () => {
    if (isLiked) return;  

    try {
      const res = await fetch(`/api/put/likeRecipe/${recipeId}`, {
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
      setIsLiked(true); 

      if (onLike) {
        onLike(updatedRecipe.likedBy.length); // Call parent function to update recipe page if necessary
      }
    } catch (error) {
      console.error('Error liking recipe:', error.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiked}  // Button is disabled only if already liked
      className={`px-5 py-2 text-xl rounded-full ${isLiked ? 'bg-gray-300 text-gray-700' : 'bg-red-500 text-white'}`}
    >
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
}

export default LikeButton;
