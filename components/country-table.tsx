'use client';

import Link from 'next/link';
import { countries } from '@/data/mockData';
import { useFilters } from '@/store/useFilters';

export function CountryTable() {
  const { region, search } = useFilters();
  const filtered = countries.filter(
    (c) => (region === 'All' || c.region === region) && c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-card p-2 backdrop-blur-md">
      <table className="min-w-full text-sm">
        <thead className="text-left text-xs uppercase text-slate-400">
          <tr>
            <th className="p-3">Country</th>
            <th className="p-3">Region</th>
            <th className="p-3">Risk</th>
            <th className="p-3">GDP (Bn)</th>
            <th className="p-3">Inflation</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.code} className="border-t border-white/5">
              <td className="p-3">{c.name}</td>
              <td className="p-3 text-slate-400">{c.region}</td>
              <td className="p-3">{c.riskScore}</td>
              <td className="p-3">{c.gdpTotalBn.toLocaleString()}</td>
              <td className="p-3">{c.inflation}%</td>
              <td className="p-3">
                <Link href={`/country/${c.code}`} className="text-neon hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
