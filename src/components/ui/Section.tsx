import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Wider container for galleries */
  wide?: boolean;
}

export default function Section({ id, children, className = "", wide }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 pb-24 pt-12 md:pb-32 md:pt-16 ${className}`}>
      <div className={`mx-auto px-6 ${wide ? "max-w-7xl" : "max-w-6xl"}`}>
        {children}
      </div>
    </section>
  );
}
