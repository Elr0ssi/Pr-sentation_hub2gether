import { create } from 'zustand';
import { RiskCategory } from '@/types';

interface FilterState {
  region: string;
  search: string;
  category: RiskCategory | 'All';
  setRegion: (region: string) => void;
  setSearch: (search: string) => void;
  setCategory: (category: RiskCategory | 'All') => void;
}

export const useFilters = create<FilterState>((set) => ({
  region: 'All',
  search: '',
  category: 'All',
  setRegion: (region) => set({ region }),
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category })
}));
