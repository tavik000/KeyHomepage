"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface FeaturedHeroMediaProps {
  href: string;
  external: boolean;
  ariaLabel: string;
  image: string;
  /** CSS object-position for the key art, e.g. "center 20%" to keep a subject
   *  near the top in frame when the banner crops a landscape image's edges. */
  objectPosition?: string;
  /** "cover" (default) fills the banner, cropping edges as needed. "contain"
   *  shrinks the art to fit with nothing cropped, filling the leftover edge
   *  with a blurred copy of itself — for art whose important content (e.g. a
   *  tall boss silhouette) can't survive cropping in either direction. */
  fit?: "cover" | "contain";
  appIcon?: string;
  previewVideo?: string;
  priority: boolean;
  period: string;
  title: string;
  confidential?: boolean;
  confidentialLabel: string;
}

const HOVER_DELAY_MS = 1000;

/**
 * Full-bleed cinematic hero image/link for a featured project. Cover
 * artwork shows immediately; when a `previewVideo` clip exists, hovering
 * (or focusing) the whole image starts a 1.5s timer before crossfading into
 * the muted gameplay clip, so casually passing the cursor over the huge hero
 * image never accidentally triggers playback. Leaving before the delay
 * elapses cancels it; leaving after playback started fades back to the
 * cover image.
 */
export default function FeaturedHeroMedia({
  href,
  external,
  ariaLabel,
  image,
  objectPosition,
  fit = "cover",
  appIcon,
  previewVideo,
  priority,
  period,
  title,
  confidential,
  confidentialLabel
}: FeaturedHeroMediaProps) {
  const [previewing, setPreviewing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBgRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();
  const showVideo = Boolean(previewVideo) && !reduceMotion;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scheduleStart = () => {
    if (!showVideo) return;
    timeoutRef.current = setTimeout(() => {
      setPreviewing(true);
      [videoRef.current, videoBgRef.current].forEach((video) => {
        if (!video) return;
        video.currentTime = 0;
        void video.play().catch(() => {});
      });
    }, HOVER_DELAY_MS);
  };

  const cancelPreview = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPreviewing(false);
    videoRef.current?.pause();
    videoBgRef.current?.pause();
  };

  const content = (
    <>
    <div className="relative aspect-[32/15] overflow-hidden sm:aspect-[8/3] lg:aspect-[10/3]">
      {/* Full-bleed cover crop by default. Portrait/product-shot key art (e.g.
          HYKE) should pass a pre-composited `heroImage` (see content/projects.ts)
          — art at full scale over a color-matched blurred extension of itself,
          baked to this banner's ratio — so cover shows it edge-to-edge with no
          runtime letterboxing. Landscape key art crops normally; use
          `objectPosition` to keep the important subject in frame. When neither
          direction can crop safely (e.g. a tall subject that spans the full
          height with no headroom), pass `fit="contain"` to shrink the art
          instead, backed by a blurred copy of itself so the leftover edge still
          reads as continuous artwork rather than a flat bar. */}
      {fit === "contain" && (
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className={`scale-110 object-cover blur-3xl brightness-[0.45] saturate-[1.15] transition-opacity duration-[400ms] ${
            previewing ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      <Image
        src={image}
        alt={title}
        fill
        sizes="100vw"
        priority={priority}
        quality={90}
        style={objectPosition ? { objectPosition } : undefined}
        className={`${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-[400ms] ${
          previewing ? "opacity-0" : "opacity-100"
        } group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
      />
      {showVideo && (
        // Preview clips are native mobile-res portrait captures — stretching them
        // with object-cover across this wide banner looked distorted, so the clip
        // plays at its own aspect ratio, centered over a blurred copy of itself
        // (same trick used for the still image) to keep the full bleed.
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoBgRef}
            src={previewVideo}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full scale-110 object-cover blur-3xl brightness-[0.45] saturate-[1.15] transition-opacity duration-[400ms] ${
              previewing ? "opacity-100" : "opacity-0"
            }`}
          />
          <video
            ref={videoRef}
            src={previewVideo}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            onEnded={cancelPreview}
            className={`absolute inset-0 m-auto h-full w-auto max-w-full object-contain shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-opacity duration-[400ms] ${
              previewing ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}
      {/* Gradient scrim for the sm+ overlay treatment below — not shown on
          mobile, where the text sits below the image instead (see comment
          there for why). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-t from-bg/90 via-bg/25 via-40% to-transparent sm:block"
      />
    </div>
    {/* Below `sm`, title/period sit in normal flow below the image on their
        own solid background instead of overlaid on top of the art — a short
        mobile banner has to fight the artwork for contrast no matter how the
        overlay is tuned, whereas separating them keeps both the art and the
        text fully legible on their own. From `sm` up there's enough banner
        height for the overlay to read fine, so it goes back on top of the
        image as before. */}
    <div className="mx-auto flex w-full max-w-6xl items-end gap-4 px-6 pt-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:pt-0 sm:pb-8 md:pb-12">
      {appIcon && (
        <Image
          src={appIcon}
          alt=""
          width={64}
          height={64}
          className="h-14 w-14 shrink-0 rounded-[22%] shadow-lg ring-1 ring-border sm:h-16 sm:w-16 sm:ring-white/15"
        />
      )}
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-accent-soft">
            {period}
          </span>
          {confidential && (
            <span className="rounded border border-accent/40 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-accent-soft">
              {confidentialLabel}
            </span>
          )}
        </div>
        <h3 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-3xl leading-[1.1] text-fg sm:text-5xl lg:text-6xl">
          {title}
        </h3>
      </div>
    </div>
    </>
  );

  const className = "group relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] block w-screen";

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={scheduleStart}
      onMouseLeave={cancelPreview}
      onFocus={scheduleStart}
      onBlur={cancelPreview}
    >
      {content}
    </a>
  ) : (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={scheduleStart}
      onMouseLeave={cancelPreview}
      onFocus={scheduleStart}
      onBlur={cancelPreview}
    >
      {content}
    </Link>
  );
}
