export type RiskCategory = 'Economic' | 'Political' | 'Environmental' | 'Military';

export interface CountryData {
  code: string;
  name: string;
  region: string;
  riskScore: number;
  gdpTotalBn: number;
  gdpPerCapita: number;
  debtToGdp: number;
  inflation: number;
  interestRate: number;
  politicalStability: number;
  tradeBalanceBn: number;
  resources: string[];
  riskHistory: { month: string; score: number }[];
}

export interface RiskEvent {
  id: string;
  date: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  category: RiskCategory;
  countryCode?: string;
}

export interface MacroSnapshot {
  globalDebtTn: number;
  globalGdpTn: number;
  debtByRegion: { region: string; debtTn: number }[];
  currencyDominance: { currency: string; share: number }[];
}

export interface FundExposure {
  fund: string;
  aumTn: number;
  exposures: { country: string; value: number }[];
}
