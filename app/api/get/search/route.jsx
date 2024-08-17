import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function GET(request) {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    
    console.log(search);
    if (!search) {
        return NextResponse.json({ error: "Search parameter is required" }, { status: 400 });
    }

    try{
        await connectMongoDB();

        const recipes = await Recipe.find({ description: { $regex: search, $options: 'i' } });

        return NextResponse.json(recipes, { status: 200 });
    } catch(error) {
        return NextResponse.json({message: "Error searching recipes", error: error.message}, {status: 500});
    }
}