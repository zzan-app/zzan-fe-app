import { create } from 'zustand';

interface AuthModalStore {
  isLoginModalVisible: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isLoginModalVisible: false,
  openLoginModal: () => set({ isLoginModalVisible: true }),
  closeLoginModal: () => set({ isLoginModalVisible: false }),
}));
