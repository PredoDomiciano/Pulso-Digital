import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminPasswordIsConfigured, adminSessionMaxAge, createAdminSessionToken, verifyAdminPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!adminPasswordIsConfigured()) {
    return NextResponse.json({ error: "Configure ADMIN_PASSWORD na Vercel antes de usar o painel." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  if (!verifyAdminPassword(String(body.password || ""))) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminSessionMaxAge,
  });
  return response;
}
