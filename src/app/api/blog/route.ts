import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
export const runtime = "nodejs";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  createdAt: string;
};

const memory: BlogPost[] = [];

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      const client = await getMongoClient();
      const db = client.db(process.env.MONGODB_DB || "fielduo");
      const items = await db
        .collection<BlogPost>("blog")
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({ items }, { status: 200 });
    }
  } catch (err) {
    console.error("Blog list error", err);
  }
  return NextResponse.json({ items: memory }, { status: 200 });
}

export async function POST(request: Request) {
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
  const title = String(body?.title || "").trim();
  const summary = String(body?.summary || "");
  const content = String(body?.content || "");
  const slug = String(body?.slug || title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"));
  if (!title || !content) return NextResponse.json({ message: "Title and content required" }, { status: 400 });

  const id = (globalThis as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
  const createdAt = new Date().toISOString();
  const doc: BlogPost = { id, title, slug, summary, content, createdAt };

  try {
    if (process.env.MONGODB_URI) {
      const client = await getMongoClient();
      const db = client.db(process.env.MONGODB_DB || "fielduo");
      await db.collection<BlogPost>("blog").createIndex({ slug: 1 }, { unique: true });
      await db.collection<BlogPost>("blog").insertOne(doc as any);
      return NextResponse.json({ ok: true, id }, { status: 201 });
    }
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ message: "Slug already exists" }, { status: 409 });
    }
    console.error("Blog insert error", err);
  }

  memory.unshift(doc);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}


