import { create } from 'zustand';

type CancelModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCancelModal = create<CancelModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
