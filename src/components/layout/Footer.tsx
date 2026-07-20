import { useTranslations } from "next-intl";
import { site } from "@/content/site";

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-faint md:flex-row">
        <p>{t("rights", { year })}</p>
        <div className="flex items-center gap-6">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            {tc("github")}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-fg"
          >
            {tc("email")}
          </a>
          <a href="#main" className="transition-colors hover:text-fg">
            {t("backToTop")} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
