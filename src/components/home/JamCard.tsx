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

  return (
    <Wrapper
      {...(project.link
        ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-faint"
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
        {award && (
          <div className="absolute bottom-3 right-3 flex items-start gap-2 rounded-lg bg-bg/85 py-1.5 pl-2 pr-3 backdrop-blur-sm">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mt-0.5 shrink-0"
            >
              <circle cx="12" cy="9" r="6.5" fill="#D4AF37" stroke="#8A6A1E" strokeWidth="0.75" />
              <circle cx="12" cy="9" r="4.4" fill="none" stroke="#F5DFA0" strokeWidth="0.6" />
              <path d="M12 6.3 12.9 8.1 14.9 8.4 13.45 9.8 13.8 11.8 12 10.85 10.2 11.8 10.55 9.8 9.1 8.4 11.1 8.1Z" fill="#8A6A1E" />
              <path d="M8.3 14.2 6.5 19.3 9.3 18.4 10.9 20.8 12.4 15.9Z" fill="#D4AF37" stroke="#8A6A1E" strokeWidth="0.5" />
              <path d="M15.7 14.2 17.5 19.3 14.7 18.4 13.1 20.8 11.6 15.9Z" fill="#D4AF37" stroke="#8A6A1E" strokeWidth="0.5" />
            </svg>
            <span className="leading-tight">
              <span className="block font-medium text-[11px] text-fg">{award.name}</span>
              <span className="block font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-faint">
                {award.event}
              </span>
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
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
