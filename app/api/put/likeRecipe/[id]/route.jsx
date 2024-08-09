import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function PUT(request, {params}) {
    const {id} = params;
    try {
        await connectMongoDB();
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!updatedRecipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json(updatedRecipe);
    } catch(error) {
        return NextResponse.json({message: "Error while liking recipe", error: error.message}, {status: 500});
    }
}