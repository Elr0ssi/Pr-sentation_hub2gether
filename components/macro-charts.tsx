'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { GlassCard } from '@/components/glass-card';
import { macroSnapshot } from '@/data/mockData';

const palette = ['#78c8a3', '#3b82f6', '#f59e0b', '#f97316', '#a855f7'];

export function MacroCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <GlassCard>
        <h3 className="text-base font-semibold">Debt Distribution by Region</h3>
        <div className="mt-2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={macroSnapshot.debtByRegion}>
              <XAxis dataKey="region" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="debtTn" fill="#78c8a3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard>
        <h3 className="text-base font-semibold">Currency Dominance</h3>
        <div className="mt-2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={macroSnapshot.currencyDominance} dataKey="share" nameKey="currency" cx="50%" cy="50%" outerRadius={90}>
                {macroSnapshot.currencyDominance.map((_, i) => (
                  <Cell key={i} fill={palette[i % palette.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
