import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function PUT(request, { params }) {
    const { id } = params;
    const { userId } = await request.json(); // Extract the userId from the request body

    try {
        await connectMongoDB();

        // Find the recipe by ID and update the likedBy array
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { $addToSet: { likedBy: userId } }, // Add userId to likedBy array, ensuring no duplicates
            { new: true }
        );

        if (!updatedRecipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json(updatedRecipe);
    } catch (error) {
        return NextResponse.json({ message: "Error while liking recipe", error: error.message }, { status: 500 });
    }
}
