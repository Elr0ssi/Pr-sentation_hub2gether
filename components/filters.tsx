'use client';

import { useFilters } from '@/store/useFilters';

const regions = ['All', 'North America', 'South America', 'Europe', 'Asia', 'Africa'];
const categories = ['All', 'Economic', 'Political', 'Environmental', 'Military'] as const;

export function Filters() {
  const { region, search, category, setRegion, setSearch, setCategory } = useFilters();

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search country"
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-neon"
      />
      <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm">
        {regions.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value as (typeof categories)[number])} className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm">
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <span className="text-xs text-slate-400">Time: Current / Historical (mock toggle-ready)</span>
    </div>
  );
}
