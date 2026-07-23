"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/content/site";

interface Stat {
  value: string;
  label: string;
}

interface NamePart {
  text: string;
  reading: string;
  gapBefore?: boolean;
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const stats = t.raw("stats") as Stat[];
  const nameParts = t.raw("nameParts") as NamePart[];

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }
  });

  const resumeHref = locale === "ja" ? site.resumeJa : site.resumeEn;

  return (
    <div className="relative flex min-h-[78svh] flex-col justify-center overflow-hidden md:min-h-[75svh]">
      {/* Subtle vignette for depth — no particles, no WebGL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 35%, rgba(206,74,59,0.05), transparent 65%)"
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-28">
        <motion.h1
          {...fadeUp(0.1)}
          className="font-[family-name:var(--font-display)] text-6xl leading-[1.4] text-fg sm:text-7xl md:text-8xl"
          aria-label={nameParts.map((p) => p.text).join("") + (t("nameAlias") ? ` ${t("nameAlias")}` : "")}
        >
          <span aria-hidden="true">
            {nameParts.map((part, i) =>
              part.reading ? (
                <span
                  key={i}
                  className={`relative inline-block ${part.gapBefore ? "ml-6 sm:ml-8 md:ml-10" : ""}`}
                >
                  <span className="absolute bottom-full left-0 whitespace-nowrap font-[family-name:var(--font-sans)] text-xs font-normal tracking-[0.15em] text-muted sm:text-sm">
                    {part.reading}
                  </span>
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
            {t("nameAlias") && (
              <span className="ml-4 align-middle font-[family-name:var(--font-sans)] text-2xl text-muted sm:text-3xl md:text-4xl">
                {t("nameAlias")}
              </span>
            )}
          </span>
        </motion.h1>
        <motion.p
          {...fadeUp(0.2)}
          className="mt-3 text-xl text-accent-soft sm:text-2xl md:text-3xl"
        >
          {t("role")}
        </motion.p>

        <motion.p
          {...fadeUp(0.32)}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {t("intro1")}
        </motion.p>
        <motion.p
          {...fadeUp(0.4)}
          className="mt-4 max-w-2xl text-base leading-relaxed text-muted"
        >
          {t("intro2")}
        </motion.p>

        <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            {t("ctaProjects")}
          </a>
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-border px-6 py-3 text-sm text-fg transition-colors hover:border-faint"
          >
            {t("ctaResume")}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-border px-6 py-3 text-sm text-fg transition-colors hover:border-faint"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            {t("ctaGithub")}
          </a>
        </motion.div>

        <motion.dl
          {...fadeUp(0.6)}
          className="mt-16 flex max-w-2xl flex-wrap gap-x-12 gap-y-6 border-t border-border pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="text-base text-fg">{s.value}</dd>
              <dt className="mt-1 text-xs uppercase tracking-[0.1em] text-faint">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        aria-hidden="true"
        {...fadeUp(0.75)}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center text-faint md:flex"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 4v14M6 12l6 6 6-6" />
          </svg>
        </motion.span>
      </motion.div>
    </div>
  );
}
