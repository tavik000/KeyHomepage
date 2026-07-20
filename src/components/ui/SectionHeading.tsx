import Reveal from "./Reveal";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="meta-label mb-4">{kicker}</p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-fg md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
