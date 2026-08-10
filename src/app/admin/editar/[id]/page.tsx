import { redirect } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { isAdminSession } from "@/lib/auth";

type Props = { params: Promise<{ id: string }> };

export default async function EditarPublicacaoPage({ params }: Props) {
  if (!(await isAdminSession())) redirect("/admin/login");
  const { id } = await params;
  return <PostEditor postId={id} />;
}
