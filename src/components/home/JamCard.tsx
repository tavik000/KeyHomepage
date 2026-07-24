"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { JamProject } from "@/content/projects";
import Tag from "@/components/ui/Tag";

interface JamCardProps {
  project: JamProject;
  title: string;
  desc: string;
  award?: { name: string; event: string };
  sourceLabel: string;
}

/**
 * Crescent laurel branch flanking the whole award badge — a curved stem
 * (like a wreath's half) bowing outward with a series of leaves along it,
 * in the badge's gold tone, referencing the laurel wreath printed on the
 * UE5 Petit Con certificate.
 */
function GoldenBranch({ flip }: { flip?: boolean }) {
  const leaves = [
    { x: 15.12, y: 34.4, r: -65 },
    { x: 12.51, y: 30.08, r: -45 },
    { x: 10.72, y: 25.4, r: -22 },
    { x: 10.03, y: 21.08, r: 0 },
    { x: 10.2, y: 17.12, r: 20 },
    { x: 11.28, y: 12.8, r: 40 },
    { x: 13.28, y: 8.48, r: 58 },
    { x: 15.92, y: 4.52, r: 75 }
  ];
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="50"
      viewBox="0 0 20 40"
      className="shrink-0"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M18 38Q2 20 18 2" fill="none" stroke="#C9A63C" strokeWidth="0.8" strokeLinecap="round" />
      {leaves.map((leaf) => (
        <ellipse
          key={`${leaf.x}-${leaf.y}-${leaf.r}`}
          cx={leaf.x}
          cy={leaf.y}
          rx="2.6"
          ry="1.15"
          fill="#C9A63C"
          transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
        />
      ))}
    </svg>
  );
}

/**
 * Compact game-jam card. When a `previewVideo` clip exists, hovering (or
 * focusing) the card crossfades to a muted looping video; otherwise the
 * thumbnail simply zooms subtly.
 */
export default function JamCard({ project, title, desc, award, sourceLabel }: JamCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const showVideo = Boolean(project.previewVideo) && !reduceMotion;

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

  const Wrapper = project.link ? "a" : "div";
  const hasAward = Boolean(award && project.awardLink);

  return (
    <Wrapper
      {...(project.link
        ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={`group flex h-full flex-col overflow-hidden rounded-lg border bg-surface transition-all duration-300 hover:-translate-y-1 ${
        hasAward
          ? "border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:shadow-[0_0_40px_-14px_rgba(212,175,55,0.4)]"
          : "border-border hover:border-faint"
      }`}
    >
      <div className="relative aspect-video shrink-0 overflow-hidden">
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
            showVideo && hovered ? "opacity-0" : "opacity-100"
          }`}
        />
        {showVideo && (
          <video
            ref={videoRef}
            src={project.previewVideo}
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

        {award && project.awardLink && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 top-5 z-10 w-44 -rotate-45 bg-gradient-to-b from-[#E8CC72] to-[#B8942E] py-1 text-center shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
          >
            <span className="font-[family-name:var(--font-mono)] text-[8px] font-bold uppercase tracking-[0.15em] text-[#4a3a12]">
              Award Winner
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {award && project.awardLink && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(project.awardLink, "_blank", "noopener,noreferrer");
            }}
            className="group/award mb-3.5 flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-[#D4AF37]/25 bg-surface-2 py-2 pl-1.5 pr-2 transition-all duration-300 hover:border-[#D4AF37]/70 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_-8px_rgba(212,175,55,0.5)]"
          >
            <GoldenBranch />
            <div className="flex items-center gap-2.5 px-1">
            {project.awardIcon ? (
              <Image
                src={project.awardIcon}
                alt=""
                width={27}
                height={32}
                className="shrink-0 rounded-sm transition-transform duration-200 group-hover/award:scale-110"
              />
            ) : (
              /* Generic gold award medal: plain circular seal with a star,
                 hanging from a single notched ribbon banner. */
              <svg
                aria-hidden="true"
                width="36"
                height="44"
                viewBox="0 0 48 58"
                className="mt-0.5 shrink-0 transition-transform duration-200 group-hover/award:scale-110"
              >
                <path d="M16 27L32 27L32 50L24 42L16 50Z" fill="#8B2E3B" stroke="#5C1E27" strokeWidth="0.5" />
                <circle cx="24" cy="18" r="11" fill="#D4AF37" stroke="#8A6A1E" strokeWidth="1" />
                <circle cx="24" cy="18" r="8.7" fill="none" stroke="#F5DFA0" strokeWidth="0.8" />
                <path
                  d="M24 11.5 25.65 15.73 30.18 15.99 26.66 18.87 27.82 23.26 24 20.8 20.18 23.26 21.34 18.87 17.82 15.99 22.35 15.73Z"
                  fill="#F8F2DC"
                />
              </svg>
            )}
            <span className="text-left leading-tight">
              <span className="block text-[13px] font-semibold text-fg transition-colors group-hover/award:text-accent-soft">
                {award.name}
              </span>
              <span className="mt-0.5 block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-muted">
                {award.event}
              </span>
            </span>
            </div>
            <GoldenBranch flip />
          </button>
        )}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-fg">{title}</h3>
          <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-faint">
            {project.year}
          </span>
        </div>
        <p className="mt-2 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-relaxed text-muted">{desc}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {project.sourceLink && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.sourceLink, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-faint hover:text-accent-soft"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              {sourceLabel}
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
