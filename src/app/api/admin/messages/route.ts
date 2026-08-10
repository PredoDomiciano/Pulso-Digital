import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth";
import { getContactMessages } from "@/lib/blob-storage";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminSession())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  try {
    return NextResponse.json({ messages: (await getContactMessages()).slice(0, 20) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ messages: [] });
  }
}
