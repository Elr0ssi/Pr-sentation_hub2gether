import { countries } from '@/data/mockData';
import { GlassCard } from '@/components/glass-card';

export function AiInsights() {
  const highestRisk = [...countries].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  return (
    <GlassCard>
      <h3 className="text-base font-semibold">AI Insights (Rule-Based)</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-200">
        <li>Top at-risk countries this month: {highestRisk.map((c) => c.name).join(', ')}.</li>
        <li>
          Emerging risk signal: {countries.filter((c) => c.inflation > 4).length} countries have inflation above 4%, indicating monetary tightening pressure.
        </li>
      </ul>
    </GlassCard>
  );
}
