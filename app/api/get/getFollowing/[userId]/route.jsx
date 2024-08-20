import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import mongoose from "mongoose";

export async function GET(request, { params }) {
    const { userId } = params;

    try {
        await connectMongoDB();

        // Find the user by userId and populate the 'following' field
        const user = await User.findById(userId).populate('following');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return the populated following field
        return NextResponse.json(user.following, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ message: "Error fetching followed users.", error: error.message }, { status: 500 });
    }
}
