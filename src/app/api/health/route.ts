import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ db: "unconfigured" }, { status: 503 });
    }
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`select 1 as ok`;
    return NextResponse.json({ db: "ok", result: rows[0]?.ok ?? null });
  } catch (e) {
    return NextResponse.json({ db: "error", message: String(e) }, { status: 500 });
  }
}
