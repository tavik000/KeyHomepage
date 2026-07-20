"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTION_LINKS: { key: string; href: string; external?: boolean }[] = [
  { key: "projects", href: "/#projects" },
  { key: "experience", href: "/#experience" },
  { key: "skills", href: "/#skills" },
  { key: "blog", href: site.blogExternal, external: true },
  { key: "contact", href: "/#contact" }
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay whenever a navigation happens
  const close = () => setMenuOpen(false);

  const resumeHref = locale === "ja" ? site.resumeJa : site.resumeEn;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-fg"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={close}
          className="font-[family-name:var(--font-display)] text-lg tracking-[0.18em] text-fg"
          aria-label={t("home")}
        >
          KEY
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {SECTION_LINKS.map(({ key, href, external }) => {
            const className =
              key === "projects"
                ? "text-sm font-medium text-fg transition-colors hover:text-accent-soft"
                : "text-sm text-muted transition-colors hover:text-fg";
            return external ? (
              <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {t(key)}
              </a>
            ) : (
              <Link key={key} href={href} className={className}>
                {t(key)}
              </Link>
            );
          })}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            {t("resume")}
          </a>
          <LanguageSwitcher />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded border border-border text-fg"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {SECTION_LINKS.map(({ key, href, external }) => (
                <li key={key}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="block rounded px-2 py-3 text-lg text-fg transition-colors hover:bg-surface"
                    >
                      {t(key)}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={close}
                      className="block rounded px-2 py-3 text-lg text-fg transition-colors hover:bg-surface"
                    >
                      {t(key)}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="block rounded px-2 py-3 text-lg text-accent-soft"
                >
                  {t("resume")}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
