import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { UserType } from "../types/type";

interface sessionState {
  user: UserType;
  setSession: (user: UserType) => void;
  deleteSession: () => void;
}

const defaultValue = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  token: "",
};

const useSession = create<sessionState>()(
  devtools(
    persist(
      (set) => ({
        user: defaultValue,
        setSession: (newData: UserType) => set(() => ({ user: newData })),
        deleteSession: () => set(() => ({ user: defaultValue })),
      }),
      {
        name: "session-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useSession;
