import { create } from "zustand";

interface LoginModalState {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void
}

const useLoginModal = create<LoginModalState>((set) => ({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({ isOpen })
}));

export default useLoginModal;