"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { IndependentProject } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import Tag from "@/components/ui/Tag";

interface IndependentProjectCardProps {
  project: IndependentProject;
  title: string;
  desc: string;
  gradient: string;
  sourceLabel: string;
}

/**
 * Independent-project card. When a `previewVideo` clip exists, hovering (or
 * focusing) the card crossfades from the key art into a muted looping video;
 * otherwise the thumbnail just zooms subtly (mirrors JamCard's behavior).
 */
export default function IndependentProjectCard({
  project,
  title,
  desc,
  gradient,
  sourceLabel
}: IndependentProjectCardProps) {
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

  const inner = (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-faint"
    >
      <div
        className="relative flex aspect-[3/2] shrink-0 items-center justify-center overflow-hidden"
        style={project.image ? undefined : { background: gradient }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className={`object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
              showVideo && hovered ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <span className="font-[family-name:var(--font-display)] text-6xl text-fg/25 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 md:text-7xl">
            {title.trim().charAt(0)}
          </span>
        )}
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
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-fg transition-colors group-hover:text-accent-soft">
            {title}
          </h3>
          {project.year && (
            <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-faint">
              {project.year}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {project.detailHref && project.link && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.link, "_blank", "noopener,noreferrer");
              }}
              className="ml-auto inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-faint hover:text-accent-soft"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              {sourceLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (project.detailHref) {
    return (
      <Link href={project.detailHref} className="block h-full">
        {inner}
      </Link>
    );
  }

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  ) : (
    inner
  );
}
