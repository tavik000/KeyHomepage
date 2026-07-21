"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  "zh-Hant": "繁體中文"
};

const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
  "zh-Hant": "繁中"
};

export default function LanguageSwitcher() {
  const t = useTranslations("langSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next !== locale) {
      router.replace(pathname, { locale: next, scroll: false });
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted transition-colors hover:border-faint hover:text-fg"
      >
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
        </svg>
        {LOCALE_SHORT[locale]}
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 top-full z-50 mt-2 min-w-36 overflow-hidden rounded-md border border-border bg-surface py-1 shadow-xl shadow-black/40"
        >
          {routing.locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-surface-2 ${
                  l === locale ? "text-accent-soft" : "text-fg"
                }`}
              >
                {LOCALE_LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
