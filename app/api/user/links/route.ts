import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { Links } from "@/db/schema";
import { LinkType } from "@/types";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const data: LinkType[] = await req.json();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    for (const link of data) {
      await db
        .insert(Links)
        .values({
          id: link.id,
          platform: link.platform,
          link: link.link,
          userId: session.user.id,
        })
        .onConflictDoUpdate({
          target: Links.id,
          set: {
            platform: link.platform,
            link: link.link,
            userId: session.user.id,
          },
        });
    }

    return NextResponse.json(
      { message: "Links updated successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to add/update links" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    //GETTING THE USER SESSION
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = session.user;

    const userLinks = await db
      .select()
      .from(Links)
      .where(eq(Links.userId, user.id));

    const validLinks: LinkType[] = userLinks.map(({ userId, ...rest }) => rest);

    return NextResponse.json(validLinks);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user links" },
      { status: 500 }
    );
  }
}
