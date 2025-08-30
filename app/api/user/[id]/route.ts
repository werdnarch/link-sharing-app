import { db } from "@/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const [userInfo] = await db.select().from(user).where(eq(user.id, id));

    if (!userInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile found", user: userInfo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get user details" },
      { status: 500 }
    );
  }
}
