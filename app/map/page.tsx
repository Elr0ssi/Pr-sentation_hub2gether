import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('@/components/world-map').then((m) => m.WorldMap), { ssr: false });

export default function MapPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Interactive Global Risk Map</h1>
      <p className="text-sm text-slate-400">Click any country marker to drill into sovereign risk metrics and trend snapshots.</p>
      <WorldMap />
    </div>
  );
}
