import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { appState } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rows = await getDb().select().from(appState).where(eq(appState.userId, userId));
  return NextResponse.json({ data: rows[0]?.data ?? null });
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const data = await req.json();
  await getDb()
    .insert(appState)
    .values({ userId, data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: appState.userId,
      set: { data, updatedAt: new Date() },
    });
  return NextResponse.json({ ok: true });
}
