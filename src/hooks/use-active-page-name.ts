
import { create } from "zustand";

interface ActivePageNameState {
    activePageName: string;
    setActivePageName: (activePageName: string) => void
}

const useActivePageName = create<ActivePageNameState>((set) => ({
    activePageName: "",
    setActivePageName: (activePageName: string) => set({ activePageName })
}));

export default useActivePageName;