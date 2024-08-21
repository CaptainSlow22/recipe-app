import { NextResponse } from "next/server";
import Recipe from "@/models/recipe";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request, { params }) {
    const { userId } = params;

    try {
      await connectMongoDB();
  
      // Find recipes liked by the user
      const likedRecipes = await Recipe.find({ likedBy: userId })
        .populate('userId', 'name email')  // Populate user information
        .populate('likedBy', 'name email') // Populate the users who liked the recipe
        .exec();
  
      return NextResponse.json(likedRecipes, { status: 200 });
    } catch (error) {
      console.error("Error fetching liked recipes:", error);
      return NextResponse.json({ message: "Failed to fetch liked recipes" }, { status: 500 });
    }
  }