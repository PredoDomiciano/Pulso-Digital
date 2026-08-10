import { redirect } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { isAdminSession } from "@/lib/auth";

export const metadata = { title: "Nova publicação" };

export default async function NovaPublicacaoPage() {
  if (!(await isAdminSession())) redirect("/admin/login");
  return <PostEditor />;
}
