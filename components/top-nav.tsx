'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Globe, Landmark, ShieldAlert } from 'lucide-react';

const links = [
  { href: '/', label: 'Dashboard', icon: Activity },
  { href: '/map', label: 'Global Map', icon: Globe },
  { href: '/country/USA', label: 'Country View', icon: Landmark },
  { href: '/#risk-feed', label: 'Risk Feed', icon: ShieldAlert }
];

export function TopNav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 md:px-8">
        <div className="text-sm font-semibold tracking-[0.2em] text-neon">AEGIS RISKSPHERE</div>
        <ul className="flex gap-2 text-xs md:gap-4 md:text-sm">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-neon/40 hover:text-neon">
                <Icon size={14} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
