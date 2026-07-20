"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/content/site";

interface Stat {
  value: string;
  label: string;
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const stats = t.raw("stats") as Stat[];

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }
  });

  const resumeHref = locale === "ja" ? site.resumeJa : site.resumeEn;

  return (
    <div className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      {/* Subtle vignette for depth — no particles, no WebGL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 35%, rgba(206,74,59,0.05), transparent 65%)"
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
        <motion.p {...fadeUp(0.05)} className="meta-label mb-6">
          {t("kicker")}
        </motion.p>
        <motion.h1
          {...fadeUp(0.15)}
          className="max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-[1.15] text-fg sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          {...fadeUp(0.3)}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {t("summary")}
        </motion.p>

        <motion.div {...fadeUp(0.45)} className="mt-10 flex flex-wrap gap-4">
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
        </motion.div>

        <motion.dl
          {...fadeUp(0.6)}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="order-2 mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-faint">
                {s.label}
              </dt>
              <dd className="order-1 font-[family-name:var(--font-display)] text-2xl text-fg">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <span className="meta-label">{t("scroll")}</span>
        <motion.span
          className="mx-auto mt-3 block h-8 w-px bg-faint"
          animate={reduceMotion ? undefined : { scaleY: [1, 0.4, 1], originY: 0 }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
