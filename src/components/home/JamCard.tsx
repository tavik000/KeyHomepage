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
  awardLabel: string;
}

/**
 * Compact game-jam card. When a `previewVideo` clip exists, hovering (or
 * focusing) the card crossfades to a muted looping video; otherwise the
 * thumbnail simply zooms subtly.
 */
export default function JamCard({ project, title, desc, awardLabel }: JamCardProps) {
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
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-faint"
    >
      <div className="relative aspect-video overflow-hidden">
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
        {project.hasAward && (
          <span className="absolute left-3 top-3 rounded bg-bg/80 px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-accent-soft backdrop-blur-sm">
            ★ {awardLabel}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-fg">{title}</h3>
          <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-faint">
            {project.year}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
