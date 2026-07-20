import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded border border-border bg-surface px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wider text-muted">
      {children}
    </span>
  );
}
