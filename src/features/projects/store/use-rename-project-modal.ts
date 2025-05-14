import { create } from 'zustand';

type RenameProjectModalState = {
  id: string;
  title: string;
  isOpen: boolean;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
};

export const useRenameProjectModal = create<RenameProjectModalState>((set) => ({
  id: '',
  title: '',
  isOpen: false,
  onOpen: (id, title) => set({ isOpen: true, id, title }),
  onClose: () => set({ isOpen: false, id: '', title: '' }),
}));
