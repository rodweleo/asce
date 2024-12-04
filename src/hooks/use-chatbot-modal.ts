// store.js
import { create } from 'zustand';

interface ChatbotModalState {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void
}

const useChatbotModal = create<ChatbotModalState>((set) => ({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({ isOpen })
}));

export default useChatbotModal;