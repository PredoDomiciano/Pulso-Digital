"use client";

import { useState } from "react";
import { CopyIcon } from "@/components/icons";

export function ShareButton() {
  const [copied, setCopied] = useState(false);
  async function share() {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  return <button className="button secondary small" onClick={share}><CopyIcon width={15} height={15}/>{copied ? "Link copiado" : "Compartilhar"}</button>;
}
