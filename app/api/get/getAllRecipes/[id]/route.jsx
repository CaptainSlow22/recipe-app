import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
  
    try {
      const singleRecipe = await Recipe.findById(id);
      if (!singleRecipe) {
        return NextResponse.json({error: "Recipe not found"},{status: 404});
      }
      return NextResponse.json({recipe: singleRecipe},{status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
  }
}