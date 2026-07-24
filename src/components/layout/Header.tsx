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
                ? "text-base font-medium text-fg transition-colors hover:text-accent-soft"
                : "text-base text-muted transition-colors hover:text-fg";
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
          {site.showResume && (
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-muted transition-colors hover:text-fg"
            >
              {t("resume")}
            </a>
          )}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-base text-muted transition-colors hover:text-fg"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            {t("github")}
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
              {site.showResume && (
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
              )}
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="block rounded px-2 py-3 text-lg text-fg transition-colors hover:bg-surface"
                >
                  {t("github")}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
