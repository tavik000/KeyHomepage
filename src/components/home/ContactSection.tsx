import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  const t = useTranslations("contact");
  const tr = useTranslations("resume");

  const links: { label: string; href: string; external?: boolean }[] = [
    { label: t("github"), href: site.github, external: true },
    ...(site.linkedin
      ? [{ label: t("linkedin"), href: site.linkedin, external: true }]
      : []),
    { label: t("blog"), href: site.blogExternal, external: true }
  ];

  return (
    <Section id="contact" className="border-t border-border">
      <SectionHeading kicker={t("kicker")} title={t("title")} description={t("lead")} />

      <Reveal>
        <a
          href={`mailto:${site.email}`}
          className="inline-block break-all font-[family-name:var(--font-display)] text-2xl text-fg underline decoration-accent/50 decoration-1 underline-offset-8 transition-colors hover:text-accent-soft sm:text-3xl md:text-4xl"
        >
          {site.email}
        </a>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          {t("location")}
        </p>
      </Reveal>

      <Reveal className="mt-14 flex flex-wrap gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="rounded border border-border px-5 py-2.5 text-sm text-fg transition-colors hover:border-faint"
          >
            {link.label}
            {link.external && <span aria-hidden="true"> ↗</span>}
          </a>
        ))}
      </Reveal>

      {site.showResume && (
        <Reveal className="mt-16" delay={0.1}>
          <h3 className="meta-label mb-5">{tr("title")}</h3>
          <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
            <a
              href={site.resumeEn}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <p className="text-fg group-hover:text-accent-soft">{tr("en")}</p>
              <p className="mt-2 text-xs text-faint">PDF ↓</p>
            </a>
            <a
              href={site.resumeJa}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <p className="text-fg group-hover:text-accent-soft">{tr("ja")}</p>
              <p className="mt-2 text-xs text-faint">PDF ↓</p>
            </a>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
