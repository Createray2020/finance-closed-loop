import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { appState } from "@/db/schema";

export const dynamic = "force-dynamic";

// rev＝這份資料最後一次寫入的時間。前端存檔時要帶上自己讀到的 rev，
// 雲端若已被別的分頁／裝置改過（rev 不同），就拒絕這次存檔，避免舊資料整包蓋掉新資料。
const revOf = (d: Date | null | undefined) => (d ? d.toISOString() : null);

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rows = await getDb().select().from(appState).where(eq(appState.userId, userId));
  return NextResponse.json({ data: rows[0]?.data ?? null, rev: revOf(rows[0]?.updatedAt) });
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const data = await req.json();
  const baseRev = req.headers.get("x-base-rev");
  const db = getDb();
  const now = new Date();

  const rows = await db.select({ updatedAt: appState.updatedAt }).from(appState).where(eq(appState.userId, userId));
  const current = rows[0];

  if (!current) {
    // 第一次存：直接建立
    await db.insert(appState).values({ userId, data, updatedAt: now }).onConflictDoNothing();
    const after = await db.select({ updatedAt: appState.updatedAt }).from(appState).where(eq(appState.userId, userId));
    return NextResponse.json({ ok: true, rev: revOf(after[0]?.updatedAt) });
  }

  const currentRev = revOf(current.updatedAt);
  // 沒帶 rev（舊版分頁）或 rev 對不上：拒絕，請前端重新讀取
  if (!baseRev || baseRev !== currentRev) {
    return NextResponse.json({ error: "conflict", rev: currentRev }, { status: 409 });
  }

  // 版本相符才寫入。（單一使用者、單次 round-trip；不再用時間戳當 SQL 條件，避免精度差異造成永遠存不進去）
  const updated = await db
    .update(appState)
    .set({ data, updatedAt: now })
    .where(eq(appState.userId, userId))
    .returning({ updatedAt: appState.updatedAt });
  return NextResponse.json({ ok: true, rev: revOf(updated[0]?.updatedAt ?? now) });
}
