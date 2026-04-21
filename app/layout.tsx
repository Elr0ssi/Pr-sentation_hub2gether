import type { Metadata } from 'next';
import './globals.css';
import { TopNav } from '@/components/top-nav';

export const metadata: Metadata = {
  title: 'Aegis RiskSphere',
  description: 'Global risk monitoring dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <TopNav />
        <main className="mx-auto min-h-screen max-w-[1500px] px-4 pb-10 pt-24 md:px-8">{children}</main>
      </body>
    </html>
  );
}
