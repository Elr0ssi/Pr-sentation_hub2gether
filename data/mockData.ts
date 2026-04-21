import { CountryData, FundExposure, MacroSnapshot, RiskEvent } from '@/types';

export const countries: CountryData[] = [
  {
    code: 'USA',
    name: 'United States',
    region: 'North America',
    riskScore: 38,
    gdpTotalBn: 28500,
    gdpPerCapita: 84500,
    debtToGdp: 122,
    inflation: 3.1,
    interestRate: 4.75,
    politicalStability: 62,
    tradeBalanceBn: -917,
    resources: ['Oil', 'Gas', 'Rare Earths'],
    riskHistory: [
      { month: 'Jan', score: 35 },
      { month: 'Feb', score: 37 },
      { month: 'Mar', score: 36 },
      { month: 'Apr', score: 38 }
    ]
  },
  {
    code: 'CHN',
    name: 'China',
    region: 'Asia',
    riskScore: 54,
    gdpTotalBn: 18700,
    gdpPerCapita: 13200,
    debtToGdp: 84,
    inflation: 1.2,
    interestRate: 3.45,
    politicalStability: 58,
    tradeBalanceBn: 640,
    resources: ['Rare Earths', 'Coal'],
    riskHistory: [
      { month: 'Jan', score: 52 },
      { month: 'Feb', score: 53 },
      { month: 'Mar', score: 55 },
      { month: 'Apr', score: 54 }
    ]
  },
  {
    code: 'DEU',
    name: 'Germany',
    region: 'Europe',
    riskScore: 29,
    gdpTotalBn: 4560,
    gdpPerCapita: 54100,
    debtToGdp: 65,
    inflation: 2.5,
    interestRate: 4,
    politicalStability: 78,
    tradeBalanceBn: 289,
    resources: ['Gas', 'Industrial Metals'],
    riskHistory: [
      { month: 'Jan', score: 27 },
      { month: 'Feb', score: 29 },
      { month: 'Mar', score: 30 },
      { month: 'Apr', score: 29 }
    ]
  },
  {
    code: 'BRA',
    name: 'Brazil',
    region: 'South America',
    riskScore: 47,
    gdpTotalBn: 2430,
    gdpPerCapita: 11300,
    debtToGdp: 88,
    inflation: 4.6,
    interestRate: 10.5,
    politicalStability: 48,
    tradeBalanceBn: 96,
    resources: ['Oil', 'Lithium', 'Iron Ore'],
    riskHistory: [
      { month: 'Jan', score: 44 },
      { month: 'Feb', score: 45 },
      { month: 'Mar', score: 47 },
      { month: 'Apr', score: 47 }
    ]
  },
  {
    code: 'ZAF',
    name: 'South Africa',
    region: 'Africa',
    riskScore: 63,
    gdpTotalBn: 405,
    gdpPerCapita: 6800,
    debtToGdp: 74,
    inflation: 5.3,
    interestRate: 8.25,
    politicalStability: 42,
    tradeBalanceBn: 13,
    resources: ['Gold', 'Platinum', 'Rare Earths'],
    riskHistory: [
      { month: 'Jan', score: 60 },
      { month: 'Feb', score: 61 },
      { month: 'Mar', score: 63 },
      { month: 'Apr', score: 63 }
    ]
  }
];

export const riskEvents: RiskEvent[] = [
  { id: '1', date: '2026-04-19', title: 'Sovereign bond spread widening', severity: 'High', category: 'Economic', countryCode: 'BRA' },
  { id: '2', date: '2026-04-20', title: 'Strategic strait military drills', severity: 'Critical', category: 'Military', countryCode: 'CHN' },
  { id: '3', date: '2026-04-20', title: 'Unexpected rate hold despite inflation uptick', severity: 'Medium', category: 'Economic', countryCode: 'USA' },
  { id: '4', date: '2026-04-21', title: 'Severe drought threatens hydro output', severity: 'High', category: 'Environmental', countryCode: 'ZAF' },
  { id: '5', date: '2026-04-21', title: 'Coalition fragility concerns in parliament', severity: 'Medium', category: 'Political', countryCode: 'DEU' }
];

export const macroSnapshot: MacroSnapshot = {
  globalDebtTn: 316,
  globalGdpTn: 113,
  debtByRegion: [
    { region: 'North America', debtTn: 106 },
    { region: 'Asia', debtTn: 98 },
    { region: 'Europe', debtTn: 82 },
    { region: 'Other', debtTn: 30 }
  ],
  currencyDominance: [
    { currency: 'USD', share: 58 },
    { currency: 'EUR', share: 20 },
    { currency: 'CNY', share: 7 },
    { currency: 'JPY', share: 5 },
    { currency: 'Other', share: 10 }
  ]
};

export const funds: FundExposure[] = [
  { fund: 'BlackRock', aumTn: 10.5, exposures: [{ country: 'USA', value: 36 }, { country: 'CHN', value: 13 }, { country: 'DEU', value: 9 }] },
  { fund: 'Vanguard', aumTn: 9.2, exposures: [{ country: 'USA', value: 41 }, { country: 'CHN', value: 9 }, { country: 'BRA', value: 6 }] },
  { fund: 'State Street', aumTn: 4.3, exposures: [{ country: 'USA', value: 29 }, { country: 'DEU', value: 12 }, { country: 'ZAF', value: 4 }] }
];
