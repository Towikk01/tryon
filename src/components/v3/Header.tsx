"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "../ui/Logo";
import { navLinks } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-gray-900/95 backdrop-blur border-b border-emerald-500/30"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="#top" aria-label="fitflow — на головну">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-gray-300 hover:text-emerald-400 transition-colors uppercase tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center bg-emerald-500 text-white px-6 py-2.5 text-sm font-bold hover:bg-emerald-600 transition-colors hover:shadow-lg uppercase tracking-tight"
          >
            Почати
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center text-white hover:bg-emerald-500/20 transition-colors"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-emerald-500/30 bg-gray-900">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-lg font-bold text-gray-300 hover:text-emerald-400 hover:bg-gray-800 transition-colors uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center bg-emerald-500 text-white px-6 py-3.5 text-base font-bold hover:bg-emerald-600 transition-colors uppercase tracking-tight"
            >
              Почати
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
