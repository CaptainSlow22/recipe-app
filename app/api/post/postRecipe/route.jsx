import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import Recipe from '@/models/recipe';

export async function POST(request) {
  try {
    await connectMongoDB();

    const { userId, name, category, imageUrl, description, cookingTime } = await request.json();
    
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newRecipe = new Recipe({
      userId,
      name,
      category,
      imageUrl,
      description,
      cookingTime
    });

    await Recipe.create(newRecipe);

    return NextResponse.json({ message: "Recipe created successfully", recipe: newRecipe }, { status: 201 });

  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json({ error: "Error creating recipe" }, { status: 500 });
  }
}