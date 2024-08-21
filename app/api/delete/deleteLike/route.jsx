import { NextResponse } from "next/server";
import Recipe from "@/models/recipe";
import { connectMongoDB } from "@/lib/mongodb";

export async function DELETE(request) {

    const { recipeId, userId } = await request.json();

    try {
      await connectMongoDB();
  
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { $pull: { likedBy: userId } },
        { new: true } // Return the updated document
      ).exec();
  
      if (!updatedRecipe) {
        return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
      }

      return NextResponse.json(updatedRecipe, { status: 200 });
    } catch (error) {
      console.error("Error unliking recipe:", error);
      return NextResponse.json({ message: "Failed to unlike recipe" }, { status: 500 });
    }
  }