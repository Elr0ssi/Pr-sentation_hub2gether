import { GlassCard } from '@/components/glass-card';
import { macroSnapshot } from '@/data/mockData';

export function KpiGrid() {
  const debtToGdp = ((macroSnapshot.globalDebtTn / macroSnapshot.globalGdpTn) * 100).toFixed(0);
  const cards = [
    { label: 'Global Debt', value: `$${macroSnapshot.globalDebtTn}T` },
    { label: 'Global GDP', value: `$${macroSnapshot.globalGdpTn}T` },
    { label: 'Debt / GDP', value: `${debtToGdp}%` },
    { label: 'USD Reserve Share', value: `${macroSnapshot.currencyDominance[0].share}%` }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {cards.map((card) => (
        <GlassCard key={card.label} className="grid-bg">
          <p className="text-xs uppercase tracking-widest text-slate-400">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold text-neon">{card.value}</p>
        </GlassCard>
      ))}
    </div>
  );
}
