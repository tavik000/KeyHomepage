"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

/**
 * Low-priority signal that I write technical UE5/game-dev content — links out
 * to the real blog rather than duplicating posts here. Quiet, editorial,
 * matches GameJournalSection's visual weight; the cover thumbnail is a
 * contained card (not the cinematic full-bleed treatment reserved for
 * commercial projects). Hovering (or focusing) crossfades the cover into a
 * looping clip of the blog's own bear mascot, mirroring JamCard's preview
 * behavior.
 */
export default function BlogTeaserSection() {
  const t = useTranslations("blogTeaser");
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const showVideo = !reduceMotion;

  const onEnter = () => {
    setHovered(true);
    if (showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };

  const onLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <section id="blog" className="scroll-mt-20 border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="meta-label mb-6">{t("kicker")}</h2>
          <a
            href={site.blogExternal}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onFocus={onEnter}
            onBlur={onLeave}
            className="group grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                src="/images/blog-cover.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 280px"
                className={`object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
                  showVideo && hovered ? "opacity-0" : "opacity-100"
                }`}
              />
              {showVideo && (
                <video
                  ref={videoRef}
                  src="/videos/blog-bear-descent.mp4"
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    hovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-fg transition-colors group-hover:text-accent-soft md:text-2xl">
                {t("title")}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {t("lead")}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent-soft transition-colors group-hover:text-fg">
                {t("cta")}
                <span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
