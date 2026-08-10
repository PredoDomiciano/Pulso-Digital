"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pulso-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = saved ? saved === "dark" : systemDark;
    document.documentElement.dataset.theme = shouldDark ? "dark" : "light";
    setDark(shouldDark);
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("pulso-theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button className="icon-button" onClick={toggle} aria-label="Alternar tema" title="Alternar tema">
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
