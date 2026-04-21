import { PropsWithChildren } from 'react';

export function GlassCard({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`rounded-2xl border border-white/10 bg-card p-4 shadow-neon backdrop-blur-md ${className}`}>{children}</section>;
}
