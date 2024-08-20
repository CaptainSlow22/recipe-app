import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function GET(request, {params}) {
    const {userId} = params;

    try{
        await connectMongoDB();
        const user = await User.find({_id: userId});
        if(!user) {
            return NextResponse.json({error: "User not found"},{status: 404});
        }
        return NextResponse.json(user, {status: 200});
    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Error fetching user.", error: error.message}, {status: 500});
    }
}