import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
export const runtime = "nodejs";

type EarlyBird = {
  id: string;
  email: string;
  createdAt: string;
};

const memoryStore: EarlyBird[] = [];

export async function POST(request: Request) {
  let body: any = {};
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid JSON" }, { status: 400 }); }
  const email = String(body?.email || "").trim().toLowerCase();
  if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

  const id = (globalThis as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
  const createdAt = new Date().toISOString();
  const doc: EarlyBird = { id, email, createdAt };

  try {
    if (process.env.MONGODB_URI) {
      const client = await getMongoClient();
      const db = client.db(process.env.MONGODB_DB || "fielduo");
      await db.collection<EarlyBird>("early_bird").createIndex({ email: 1 }, { unique: true });
      await db.collection<EarlyBird>("early_bird").insertOne(doc as any);
      return NextResponse.json({ ok: true, id }, { status: 201 });
    }
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ ok: true, message: "Already signed up" }, { status: 200 });
    }
    console.error("Early bird insert error", err);
  }

  if (!memoryStore.find((n) => n.email === email)) memoryStore.unshift(doc);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      const client = await getMongoClient();
      const db = client.db(process.env.MONGODB_DB || "fielduo");
      const items = await db
        .collection<EarlyBird>("early_bird")
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({ items }, { status: 200 });
    }
  } catch (err) {
    console.error("Early bird list error", err);
  }
  return NextResponse.json({ items: memoryStore }, { status: 200 });
}


