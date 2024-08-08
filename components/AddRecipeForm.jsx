"Use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AddRecipeForm = () => {
    const {data: session} = useSession();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [cookingTime, setCookingTime] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = session.user.id;

        if(!userId || !name || !category ) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/post/postRecipe', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    name,
                    category,
                    imageUrl,
                    description,
                    cookingTime,
                }),
            });
            
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/dashboard");
            } else {
                console.log("Add Recipe failed.");
            }
        } catch(error) {
            console.log("Error during add recipe: ", error);
        }
    }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Add Your Recipe</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Recipe Name"
          />
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Category"
          />
          <input
            onChange={(e) => setCookingTime(e.target.value)}
            type="number"
            placeholder="Cooking Time in Minutes"
          />
          <input
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
            placeholder="Image"
          />
          <textarea className='px-6 py-2'
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Add
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddRecipeForm