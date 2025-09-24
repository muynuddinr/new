import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth_token", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return res;
}


