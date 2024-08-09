import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import mongoose from "mongoose";

export async function GET(request, {params}) {
    const userId = params.userId;
    try {
        await connectMongoDB();
    
        const userRecipes = await Recipe.find({ userId: userId});
        
        if(!userRecipes) {
            return NextResponse.json({error: "Recipes not found"},{status: 404});
        }
        return NextResponse.json({recipes: userRecipes},{status: 200});
    } catch(error) {
        return NextResponse.json({message:"Error fetching recipes", error: error.message},{status: 500});
    }
}