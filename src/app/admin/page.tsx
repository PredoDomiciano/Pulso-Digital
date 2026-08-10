import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { isAdminSession } from "@/lib/auth";

export const metadata = { title: "Painel" };

export default async function AdminPage() {
  if (!(await isAdminSession())) redirect("/admin/login");
  return <AdminDashboard />;
}
