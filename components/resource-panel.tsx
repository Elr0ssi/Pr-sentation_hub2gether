'use client';

import { GlassCard } from '@/components/glass-card';
import { countries } from '@/data/mockData';

const keyResources = ['Oil', 'Gas', 'Lithium', 'Rare Earths'];

export function ResourcePanel() {
  const distribution = keyResources.map((resource) => ({
    resource,
    countries: countries.filter((c) => c.resources.some((r) => r.includes(resource))).length
  }));

  return (
    <GlassCard>
      <h3 className="text-base font-semibold">Resource Distribution</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {distribution.map((item) => (
          <div key={item.resource} className="rounded-xl border border-white/10 p-3">
            <p className="text-sm text-slate-300">{item.resource}</p>
            <p className="text-xl font-semibold text-neon">{item.countries}</p>
            <p className="text-xs text-slate-400">countries with high strategic reserves</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
