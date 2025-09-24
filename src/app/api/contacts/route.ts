import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  country: string;
  phone: string;
  message: string;
  status?: "pending" | "done";
};

type StoredContact = ContactPayload & {
  id: string;
  createdAt: string;
};

// Fallback in-memory store if DB is not configured
const contactsStore: StoredContact[] = [];

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, country, phone, message } = body as ContactPayload;

  if (!email || !subject || !phone || !message) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const id = (globalThis as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
  const createdAt = new Date().toISOString();
  const entry: StoredContact = { id, name: name || "", email, subject, country: country || "", phone, message, createdAt, status: (body as any)?.status === "done" ? "done" : "pending" };

  try {
    if (process.env.MONGODB_URI) {
      const client = await getMongoClient();
      const dbName = process.env.MONGODB_DB || "fielduo";
      const db = client.db(dbName);
      const result = await db.collection<StoredContact>("contacts").insertOne(entry as any);
      return NextResponse.json({ ok: true, id: String(result.insertedId) }, { status: 201 });
    }
  } catch (err) {
    console.error("Mongo insert error", err);
    // fall through to memory store
  }

  contactsStore.unshift(entry);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      const client = await getMongoClient();
      const dbName = process.env.MONGODB_DB || "fielduo";
      const db = client.db(dbName);
      const items = await db
        .collection<StoredContact>("contacts")
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({ items }, { status: 200 });
    }
  } catch (err) {
    console.error("Mongo list error", err);
  }
  return NextResponse.json({ items: contactsStore }, { status: 200 });
}


