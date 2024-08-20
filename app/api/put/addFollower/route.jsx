import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function PUT(request) {
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

    // Check if already following
    if (follower.following.includes(followedId) || followed.followers.includes(followerId)) {
      return NextResponse.json({ error: "Already following" }, { status: 400 });
    }

    // Add the followed user to the follower's following list
    follower.following.push(followedId);
    // Add the follower user to the followed's followers list
    followed.followers.push(followerId);

    // Save the updated documents
    await follower.save();
    await followed.save();

    return NextResponse.json({ message: "User followed successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
