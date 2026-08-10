import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth";
import { uploadPostImage } from "@/lib/blob-storage";

export const runtime = "nodejs";
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdminSession())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) return NextResponse.json({ error: "Selecione uma imagem." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "O arquivo precisa ser uma imagem." }, { status: 400 });
  if (file.size > MAX_IMAGE_SIZE) return NextResponse.json({ error: "Use uma imagem de até 4 MB." }, { status: 413 });

  try {
    const blob = await uploadPostImage(file);
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Falha no upload. Confira a configuração do Vercel Blob." }, { status: 500 });
  }
}
