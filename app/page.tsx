import dynamic from 'next/dynamic';
import { Filters } from '@/components/filters';
import { KpiGrid } from '@/components/kpi-grid';
import { MacroCharts } from '@/components/macro-charts';
import { RiskFeed } from '@/components/risk-feed';
import { CountryTable } from '@/components/country-table';
import { FundNetwork } from '@/components/fund-network';
import { ResourcePanel } from '@/components/resource-panel';
import { AiInsights } from '@/components/ai-insights';

const WorldMap = dynamic(() => import('@/components/world-map').then((m) => m.WorldMap), { ssr: false });

export default function HomePage() {
  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-2xl font-bold md:text-3xl">Global Risk Intelligence Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Monitor systemic, macroeconomic, and geopolitical risk in one command center.</p>
      </section>
      <Filters />
      <KpiGrid />
      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <WorldMap />
        <RiskFeed />
      </section>
      <CountryTable />
      <MacroCharts />
      <FundNetwork />
      <ResourcePanel />
      <AiInsights />
    </div>
  );
}
