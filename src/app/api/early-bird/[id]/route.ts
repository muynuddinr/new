import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
export const runtime = "nodejs";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ message: "DB not configured" }, { status: 500 });
    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB || "fielduo");
    const res = await db.collection("early_bird").deleteOne({ id });
    if (res.deletedCount === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Early bird delete error", err);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}


