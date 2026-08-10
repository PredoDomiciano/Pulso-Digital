import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import { del, list, put } from "@vercel/blob";
import { basePosts } from "@/data/base-posts";
import type { Post } from "@/types/post";

const POSTS_PREFIX = "pulso/posts/";
const IMAGES_PREFIX = "pulso/images/";
const CONTACT_PREFIX = "pulso/contact/";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

type EncryptedEnvelope = {
  iv: string;
  tag: string;
  data: string;
};

async function blobsWithPrefix(prefix: string) {
  const { blobs } = await list({ prefix, limit: 1000 });
  return blobs;
}

async function readPublicJson<T>(url: string, version?: string | number | Date): Promise<T> {
  const suffix = version ? `?v=${encodeURIComponent(String(version instanceof Date ? version.getTime() : version))}` : "";
  const response = await fetch(`${url}${suffix}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Falha ao ler arquivo do Blob (${response.status}).`);
  return response.json() as Promise<T>;
}

export async function getAllStoredPosts(): Promise<Post[]> {
  try {
    const blobs = await blobsWithPrefix(POSTS_PREFIX);
    const posts = await Promise.all(
      blobs
        .filter((blob) => blob.pathname.endsWith(".json"))
        .map((blob) => readPublicJson<Post>(blob.url, blob.uploadedAt).catch(() => null)),
    );

    const latest = new Map<string, Post>(basePosts.map((post) => [post.id, post]));
    for (const post of posts) {
      if (!post) continue;
      const current = latest.get(post.id);
      if (!current || new Date(post.updated_at).getTime() > new Date(current.updated_at).getTime()) latest.set(post.id, post);
    }

    return [...latest.values()].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error("Erro ao carregar publicações do Vercel Blob:", error);
    return basePosts;
  }
}

export async function getStoredPostById(id: string): Promise<Post | null> {
  try {
    const blobs = await blobsWithPrefix(`${POSTS_PREFIX}${id}/`);
    const newest = blobs
      .filter((blob) => blob.pathname.endsWith(".json"))
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0];
    return newest ? await readPublicJson<Post>(newest.url, newest.uploadedAt) : basePosts.find((post) => post.id === id) || null;
  } catch (error) {
    console.error("Erro ao carregar publicação do Vercel Blob:", error);
    return basePosts.find((post) => post.id === id) || null;
  }
}

export async function saveStoredPost(post: Post) {
  const oldBlobs = await blobsWithPrefix(`${POSTS_PREFIX}${post.id}/`);
  const pathname = `${POSTS_PREFIX}${post.id}/${Date.now()}-${randomUUID()}.json`;
  const blob = await put(pathname, JSON.stringify(post, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
  });

  if (oldBlobs.length) {
    try {
      await del(oldBlobs.map((item) => item.url));
    } catch (error) {
      console.warn("A nova versão foi salva, mas versões antigas não puderam ser removidas:", error);
    }
  }
  return blob;
}

export async function deleteStoredPost(id: string) {
  const blobs = await blobsWithPrefix(`${POSTS_PREFIX}${id}/`);
  if (blobs.length) await del(blobs.map((item) => item.url));
}

export async function uploadPostImage(file: File) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "imagem";
  return put(`${IMAGES_PREFIX}${Date.now()}-${randomUUID()}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: false,
  });
}

function contactKey() {
  const secret = process.env.ADMIN_PASSWORD || "";
  if (!secret) throw new Error("ADMIN_PASSWORD não configurada.");
  return createHash("sha256").update(secret).digest();
}

function encryptContact(message: ContactMessage): EncryptedEnvelope {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", contactKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(message), "utf8"), cipher.final()]);
  return {
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: encrypted.toString("base64"),
  };
}

function decryptContact(envelope: EncryptedEnvelope): ContactMessage {
  const decipher = createDecipheriv("aes-256-gcm", contactKey(), Buffer.from(envelope.iv, "base64"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(envelope.data, "base64")), decipher.final()]);
  return JSON.parse(decrypted.toString("utf8")) as ContactMessage;
}

export async function saveContactMessage(input: Omit<ContactMessage, "id" | "created_at">) {
  const message: ContactMessage = { ...input, id: randomUUID(), created_at: new Date().toISOString() };
  const envelope = encryptContact(message);
  await put(`${CONTACT_PREFIX}${Date.now()}-${randomUUID()}.json`, JSON.stringify(envelope), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
  });
  return message;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const blobs = await blobsWithPrefix(CONTACT_PREFIX);
  const messages = await Promise.all(
    blobs
      .filter((blob) => blob.pathname.endsWith(".json"))
      .map(async (blob) => {
        try {
          return decryptContact(await readPublicJson<EncryptedEnvelope>(blob.url, blob.uploadedAt));
        } catch {
          return null;
        }
      }),
  );

  return messages
    .filter((message): message is ContactMessage => Boolean(message))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
