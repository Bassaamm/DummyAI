import { create } from "zustand";

interface useModelProbs {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModel = create<useModelProbs>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
