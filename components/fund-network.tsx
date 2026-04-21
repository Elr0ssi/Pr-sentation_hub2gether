import { GlassCard } from '@/components/glass-card';
import { funds } from '@/data/mockData';

export function FundNetwork() {
  return (
    <GlassCard>
      <h3 className="text-base font-semibold">Financial Power Structure</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {funds.map((fund) => (
          <div key={fund.fund} className="rounded-xl border border-white/10 bg-black/25 p-3">
            <p className="font-medium">{fund.fund}</p>
            <p className="text-sm text-neon">AUM: ${fund.aumTn}T</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              {fund.exposures.map((exposure) => (
                <li key={exposure.country}>
                  {exposure.country}: {exposure.value}% exposure
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
