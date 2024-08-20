import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request, {params}) {
    const {userId} = params;

    try {
        await connectMongoDB();
        const users = await User.find({ _id: { $ne: userId } });
        if(!users) {
            return NextResponse.json({error: "Couldn't find any users"}, {status: 404});
        }

        return NextResponse.json({users: users}, {status: 200});
    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Error fetching users.", error: error.message}, {status: 500});
    }
}