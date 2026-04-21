import { notFound } from 'next/navigation';
import { countries } from '@/data/mockData';
import { GlassCard } from '@/components/glass-card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CountryPage({ params }: { params: { code: string } }) {
  const country = countries.find((c) => c.code === params.code.toUpperCase());
  if (!country) return notFound();

  const stats = [
    ['GDP Total', `$${country.gdpTotalBn.toLocaleString()}B`],
    ['GDP per Capita', `$${country.gdpPerCapita.toLocaleString()}`],
    ['Debt to GDP', `${country.debtToGdp}%`],
    ['Inflation', `${country.inflation}%`],
    ['Interest Rate', `${country.interestRate}%`],
    ['Political Stability', `${country.politicalStability}/100`],
    ['Trade Balance', `$${country.tradeBalanceBn}B`],
    ['Risk Score', `${country.riskScore}`]
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{country.name} Risk Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <GlassCard key={label}>
            <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-2 text-xl font-semibold text-neon">{value}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <h2 className="text-base font-semibold">Risk Score Evolution</h2>
        <div className="mt-3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={country.riskHistory}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#78c8a3" strokeWidth={3} dot={{ fill: '#78c8a3' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard>
        <h2 className="text-base font-semibold">Strategic Natural Resources</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {country.resources.map((resource) => (
            <span key={resource} className="rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-sm">
              {resource}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
