# Aegis RiskSphere Dashboard

Production-style global risk monitoring dashboard built with **Next.js + TypeScript + TailwindCSS**.

## Features

- Interactive dark-themed world map with country risk scoring
- Country detail pages with macro/risk indicators and score evolution charts
- Global risk feed timeline with categories and severity levels
- Macro dashboard (global debt, GDP, currency dominance, debt distribution)
- Financial power structure panel (fund AUM and country exposure)
- Resource distribution panel (oil, gas, lithium, rare earths)
- Global filters and search (region, risk category, country)
- Rule-based AI insights panel
- API routes ready for real data integrations

## Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS (dark mode default)
- Recharts
- React Leaflet
- Zustand
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

- `/` — main global dashboard
- `/map` — map-first exploration view
- `/country/[code]` — country detail page (e.g., `/country/USA`)
- `/api/countries` — mock countries JSON
- `/api/events` — mock risk events JSON

## Deployment

Vercel-ready. Deploy directly with default Next.js settings.

## Data

Mock datasets are in `data/mockData.ts`, structured to later integrate:

- World Bank
- IMF
- OECD
- UN and public financial datasets
