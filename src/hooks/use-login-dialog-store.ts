// store.js
import { create } from 'zustand';

const useLoginDialogStore = create((set) => ({
    isLoginVisible: false,
    showLogin: () => set({ isLoginVisible: true }),
    hideLogin: () => set({ isLoginVisible: false }),
}));

export default useLoginDialogStore;
