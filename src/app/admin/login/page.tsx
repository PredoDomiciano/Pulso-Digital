"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => { if (data.authenticated) router.replace("/admin"); })
      .catch(() => undefined);
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: String(form.get("password") || "") }),
    }).catch(() => null);

    setLoading(false);
    if (!response) return setError("Não foi possível conectar ao servidor.");
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return setError(data.error || "Senha incorreta.");

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <span className="eyebrow">Área restrita</span>
        <h1>Painel do {siteConfig.name}</h1>
        <p>Digite a senha de administrador para criar, editar e publicar matérias.</p>
        <form onSubmit={submit}>
          <div className="field"><label htmlFor="password">Senha</label><input id="password" name="password" className="input" type="password" autoComplete="current-password" required autoFocus /></div>
          <button className="button accent" disabled={loading}>{loading ? "Entrando..." : "Entrar no painel"}</button>
          {error && <div className="form-status error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
