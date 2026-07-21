"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { IndependentProject } from "@/content/projects";
import Tag from "@/components/ui/Tag";

interface IndependentProjectCardProps {
  project: IndependentProject;
  title: string;
  desc: string;
  gradient: string;
}

/**
 * Independent-project card. When a `previewVideo` clip exists, hovering (or
 * focusing) the card crossfades from the key art into a muted looping video;
 * otherwise the thumbnail just zooms subtly (mirrors JamCard's behavior).
 */
export default function IndependentProjectCard({ project, title, desc, gradient }: IndependentProjectCardProps) {
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
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-faint"
    >
      <div
        className="relative flex aspect-[3/2] items-center justify-center overflow-hidden"
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
      <div className="p-6">
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
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
