import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070b0f',
        card: 'rgba(19, 27, 36, 0.65)',
        neon: '#78c8a3',
        riskLow: '#22c55e',
        riskMid: '#f59e0b',
        riskHigh: '#f97316',
        riskCritical: '#ef4444'
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(120,200,163,0.4), 0 0 24px rgba(120,200,163,0.15)'
      }
    }
  },
  plugins: []
};

export default config;
