'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { countries } from '@/data/mockData';
import { riskColor } from '@/lib/utils';
import Link from 'next/link';

const positions: Record<string, [number, number]> = {
  USA: [38, -97],
  CHN: [35, 103],
  DEU: [51, 10],
  BRA: [-10, -55],
  ZAF: [-30, 25]
};

export function WorldMap() {
  return (
    <div className="h-[560px] overflow-hidden rounded-2xl border border-white/10">
      <MapContainer center={[20, 0]} zoom={2} minZoom={2} className="h-full w-full bg-[#02050a]">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap &copy; CARTO" />
        {countries.map((country) => {
          const pos = positions[country.code];
          if (!pos) return null;
          return (
            <CircleMarker key={country.code} center={pos} radius={8 + country.riskScore / 15} pathOptions={{ color: riskColor(country.riskScore), fillOpacity: 0.55 }}>
              <Popup>
                <div className="space-y-2 text-black">
                  <p className="font-semibold">{country.name}</p>
                  <p>Risk Score: {country.riskScore}</p>
                  <Link className="text-blue-600 underline" href={`/country/${country.code}`}>
                    Open country dashboard
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
