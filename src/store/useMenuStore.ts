import { create } from 'zustand';

type MobileMenuStore = {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  closeMenu: () => set({ isOpen: false }),
}));
