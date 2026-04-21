import { GlassCard } from '@/components/glass-card';
import { riskEvents } from '@/data/mockData';
import { severityClass } from '@/lib/utils';

export function RiskFeed() {
  return (
    <GlassCard className="h-full">
      <h2 className="text-lg font-semibold">Global Risk Monitor</h2>
      <div className="mt-4 space-y-3" id="risk-feed">
        {riskEvents.map((event) => (
          <div key={event.id} className="rounded-xl border border-white/10 bg-black/25 p-3">
            <div className="flex justify-between text-xs text-slate-400">
              <span>{event.date}</span>
              <span className={severityClass(event.severity)}>{event.severity}</span>
            </div>
            <p className="mt-1 text-sm font-medium">{event.title}</p>
            <p className="text-xs text-slate-400">{event.category}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
