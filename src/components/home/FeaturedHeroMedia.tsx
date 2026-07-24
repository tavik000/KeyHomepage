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
    <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[2/1] lg:aspect-[5/2]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="100vw"
        priority={priority}
        className={`object-cover transition-opacity duration-[400ms] ${
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
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/5 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-6xl items-end gap-4 px-6 pb-8 md:pb-12">
        {appIcon && (
          <Image
            src={appIcon}
            alt=""
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-[22%] shadow-lg ring-1 ring-white/15 sm:h-16 sm:w-16"
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
    </div>
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
