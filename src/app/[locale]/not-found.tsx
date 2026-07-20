import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main id="main" className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="meta-label mb-4">404</p>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-fg md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 rounded border border-border px-5 py-2.5 text-sm text-fg transition-colors hover:border-faint"
      >
        {t("back")}
      </Link>
    </main>
  );
}
