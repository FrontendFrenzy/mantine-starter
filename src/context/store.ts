import { create } from 'zustand';

interface BearState {
  bears: number;
  actions: {
    increasePopulation: (by: number) => void;
    removeAllBears: () => void;
  };
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,

  actions: {
    increasePopulation: (by) => set((state) => ({ bears: state.bears + by })),
    removeAllBears: () => set({ bears: 0 }),
  },
}));

export const useBears = () => useBearStore((state) => state.bears);
export const useBearActions = () => useBearStore((state) => state.actions);
