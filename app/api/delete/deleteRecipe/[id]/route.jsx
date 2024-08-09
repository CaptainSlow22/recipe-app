import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function DELETE(request, {params}) {
    const {id} = params;
    try {
        await connectMongoDB();
        const deletedRecipe = await Recipe.findByIdAndDelete({_id: id});
        if(!deletedRecipe) {
            return NextResponse.json({error: "Recipe not found"}, {status: 404});
        }

        return NextResponse.json({successful: true}, {status: 200});

    } catch(error) {
        return NextResponse.json({message: "Error deleting recipe", error: error.message}, {status: 500});
    }
}