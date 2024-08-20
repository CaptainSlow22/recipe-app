import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import Recipe from "@/models/recipe";

export async function GET(request, { params }) {
    const { userId } = params;

    try {
        await connectMongoDB();

        // Find the user by userId and populate the 'following' field
        const user = await User.findById(userId).populate('following');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get the IDs of the users being followed
        const followedUserIds = user.following.map(followedUser => followedUser._id);

        // Fetch recipes from the followed users
        const recipes = await Recipe.find({ userId: { $in: followedUserIds } }).populate('userId');

        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ message: "Error fetching recipes.", error: error.message }, { status: 500 });
    }
}
