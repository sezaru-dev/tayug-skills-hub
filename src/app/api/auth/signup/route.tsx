import { hashPassword } from "@/lib/auth-bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  try {
    const { name, email, password} = await req.json()

    // check if the fields are completed
    if(!name || !email || !password) {
      return NextResponse.json({error: "Missing fields"}, {status: 400})
    }

    // find user in database with the provided email
    const existingUser = await prisma.user.findUnique(
      {where: {email}}
    )

    // checkes if the users is already exists
    if (existingUser) {
      return NextResponse.json({error: "User already exists"}, {status: 409})
    }

    // hash the user's password before storing it in the database
    const hashedPassword = await hashPassword(password)

    // create a new user record with name, email, and hashed password
    const newUser = await prisma.user.create({
      data: {name, email, password: hashedPassword}
    })

    // return a success response with the new user's ID
    return NextResponse.json({message: "User created", userId: newUser.id})

  } catch (error) {
    // catch any unexpected errors and return a 500 error response
    return NextResponse.json({error: "Internal server error"}, {status: 500})
  }
}