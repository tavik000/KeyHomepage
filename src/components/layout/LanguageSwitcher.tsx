"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  ja: "JA",
  "zh-Hant": "HK"
};

export default function LanguageSwitcher() {
  const t = useTranslations("langSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (next !== locale) {
      router.replace(pathname, { locale: next, scroll: false });
    }
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs tracking-wider"
    >
      {routing.locales.map((l, i) => (
        <div key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-faint">/</span>}
          <button
            type="button"
            aria-current={l === locale ? "true" : undefined}
            onClick={() => switchTo(l)}
            className={`cursor-pointer transition-colors ${
              l === locale ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {LOCALE_SHORT[l]}
          </button>
        </div>
      ))}
    </div>
  );
}
