import { SavedProviderRepository } from "@/features/saved-provider/saved-provider-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await verifySession([Role.PROVIDER])

    if (session instanceof NextResponse) {
      return session
    }

    const userId = session.user.id

    const savedProviders = await SavedProviderRepository.getSavedProviders(userId)

    return NextResponse.json(savedProviders, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST (req: NextRequest) {
  try {
    //verify session
    const session = await verifySession([Role.PROVIDER])
  
    if (session instanceof NextResponse) {
      return session // EARLY RETURN
    }

    const userId = session.user.id


    const body = await req.json();
    const providerId = body.providerId;

    if (!providerId) {
      return NextResponse.json(
        { error: "Provider ID is required" },
        { status: 400 }
      );
    }

    // Create category
    const savedProvider = await SavedProviderRepository.add({userId, providerId})
    return NextResponse.json(savedProvider, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 

export async function DELETE(req: NextRequest) {
  try {
    //verify session, return session if true
    const session = await verifySession([Role.PROVIDER])

    if (session instanceof NextResponse) {
      return session
    }

    const userId = session.user.id
  

    const body = await req.json();
    const providerId = body.providerId;

    if (!providerId) {
      return NextResponse.json(
        { error: "Provider ID is required" },
        { status: 400 }
      )
    }

    const result = await SavedProviderRepository.remove({userId,providerId})

    return NextResponse.json({result},{ status: 200 })

  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
    { error: (error as Error).message }, // 👈 expose real error
    { status: 500 }
  )
  }
}