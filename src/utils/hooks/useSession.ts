import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { UserType } from "../types/type";

interface sessionState {
  user: UserType;
  isAuthenticated: boolean;
  setSession: (user: UserType) => void;
  deleteSession: () => void;
}

const defaultValue = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  login_tokens: "",
};

const useSession = create<sessionState>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        user: defaultValue,
        setSession: (newData) =>
          set(() => ({ user: newData, isAuthenticated: true })),
        deleteSession: () =>
          set(() => ({ user: defaultValue, isAuthenticated: false })),
      }),
      {
        name: "session-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useSession;
