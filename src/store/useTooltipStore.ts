import { create } from 'zustand';

interface TooltipState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useTooltipStore = create<TooltipState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));