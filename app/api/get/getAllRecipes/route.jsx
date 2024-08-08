import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Recipe from '@/models/recipe';

export async function GET() {
    try {
        await connectMongoDB();
        const allRecipes = await Recipe.find({});
        
        return NextResponse.json({recipes: allRecipes}, { status: 200 });
    } catch(error) {
        console.log("Error getting all recipes",error);
        NextResponse.json({error: "Error getting all recipes"},{status: 500});
    }
}