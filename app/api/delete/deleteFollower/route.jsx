import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function DELETE(request) {
    const { followerId, followedId } = await request.json();
    try {
        await connectMongoDB();

        // Validate that the IDs are valid MongoDB ObjectIds
        if (!mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followedId)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        // Find the follower and followed user documents
        const follower = await User.findById(followerId);
        const followed = await User.findById(followedId);

        if (!follower || !followed) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if the user is following the followed user
        if (!follower.following.includes(followedId) || !followed.followers.includes(followerId)) {
            return NextResponse.json({ error: "Not following" }, { status: 400 });
        }

        // Remove the followed user from the follower's following list
        follower.following = follower.following.filter(id => id.toString() !== followedId.toString());
        // Remove the follower user from the followed's followers list
        followed.followers = followed.followers.filter(id => id.toString() !== followerId.toString());

        // Save the updated documents
        await follower.save();
        await followed.save();

        return NextResponse.json({ message: "User unfollowed successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
