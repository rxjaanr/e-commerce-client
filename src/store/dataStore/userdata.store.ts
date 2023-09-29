import { create } from "zustand";

interface iData {
  authData: {
    name?: string;
    address?: string;
    email?: string;
    password?: string;
    bank_account?: string;
  };
  setData: (callback: CallableFunction) => void;
  removeAllData: () => void;
}

const useAuthDataStore = create<iData>()((set) => ({
  authData: {},
  setData: (callback) =>
    set((state) => ({ authData: callback(state.authData) })),
  removeAllData: () => set((state) => ({ authData: {} })),
}));

export default useAuthDataStore;
