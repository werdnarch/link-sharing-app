import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    //GETTING THE USER SESSION
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = session.user;

    const profileDetail = {
      id: user.id,
      image: user.image,
      firstName: user.name.trim().split(" ").slice(0, -1).join(" "),
      lastName: user.name.trim().split(" ").slice(-1)[0],
      email: user.email,
    };

    return NextResponse.json(profileDetail);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [updatedUser] = await db
      .update(user)
      .set({
        name: data.name,
        updatedAt: new Date(),
        image: data.image,
      })
      .where(eq(user.id, session.user.id))
      .returning();

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update user details" },
      { status: 500 }
    );
  }
}
