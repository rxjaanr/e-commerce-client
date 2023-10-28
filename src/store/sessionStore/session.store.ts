import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface iSessionStore {
  sessionData: {
    name: string;
    email: string;
    role: string;
    login_tokens: string;
  };

  setSessionData: (newData: any) => void;
}

const useSessionStore = create<iSessionStore>()(
  persist(
    (set) => ({
      sessionData: {
        name: "",
        email: "",
        role: "",
        login_tokens: "",
      },
      setSessionData: (newData) => set((state) => ({ sessionData: newData })),
    }),
    {
      name: "session-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSessionStore;
