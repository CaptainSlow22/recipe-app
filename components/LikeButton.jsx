'use client';

import { useState } from 'react';

function LikeButton({ recipeId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (isLiked) return;  

    try {
      const res = await fetch(`http://localhost:3000/api/put/likeRecipe/${recipeId}`, {
        method: 'PUT',
      });

      if (!res.ok) {
        throw new Error('Failed to update likes');
      }

      const updatedRecipe = await res.json();
      setLikes(updatedRecipe.likes);
      setIsLiked(true);  // Disable the button after pressing
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button onClick={handleLike} disabled={isLiked} className={`px-8 py-3 text-xl bg-red-500 text-white rounded-2xl ${isLiked ? "bg-gray-300 text-gray-700" : ""}`}>
      {isLiked ? 'Liked' : `Like`}
    </button>
  );
}

export default LikeButton;
