"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "@/components/icons";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("loading");
    setMessage("");

    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (!response) {
      setStatus("error");
      setMessage("Não foi possível enviar agora. Tente novamente.");
      return;
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "Não foi possível enviar agora. Tente novamente.");
      return;
    }

    formElement.reset();
    setStatus("success");
    setMessage("Mensagem enviada. Obrigado pelo contato!");
  }

  return (
    <form onSubmit={submit}>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <div className="form-grid">
        <div className="field"><label htmlFor="name">Nome</label><input className="input" id="name" name="name" required placeholder="Seu nome" /></div>
        <div className="field"><label htmlFor="email">E-mail</label><input className="input" id="email" name="email" type="email" required placeholder="voce@exemplo.com" /></div>
        <div className="field full"><label htmlFor="subject">Assunto</label><input className="input" id="subject" name="subject" required placeholder="Sobre o que você quer falar?" /></div>
        <div className="field full"><label htmlFor="message">Mensagem</label><textarea className="textarea" id="message" name="message" required placeholder="Escreva sua mensagem..." /></div>
      </div>
      <div style={{ marginTop: 18 }}><button className="button accent" disabled={status === "loading"}>{status === "loading" ? "Enviando..." : <>Enviar mensagem <ArrowIcon width={18} height={18}/></>}</button></div>
      {message && <div className={`form-status ${status}`}>{message}</div>}
    </form>
  );
}
