"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { MenuIcon, XIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><span /></span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link className="admin-link" href="/admin" onClick={() => setOpen(false)}>Painel</Link>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button className="icon-button mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menu">
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
