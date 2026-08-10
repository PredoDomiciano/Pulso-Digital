import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/blob-storage";

export const runtime = "nodejs";

function clean(value: unknown, max: number) {
  return String(value || "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 180);
  const subject = clean(body.subject, 180);
  const message = clean(body.message, 5000);

  if (!name || !email || !subject || !message) return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });

  try {
    await saveContactMessage({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível enviar agora. Tente novamente." }, { status: 500 });
  }
}
