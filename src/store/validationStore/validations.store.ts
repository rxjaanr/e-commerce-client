import { create } from "zustand";

type ValidationType = {
  validations: {} | any;
  setValidations: (data: {}) => void;
  removeAllValidations: () => void;
};

const useValidationStore = create<ValidationType>()((set) => ({
  validations: {},
  setValidations: (data) => set(() => ({ validations: data })),
  removeAllValidations: () => set(() => ({ validations: {} })),
}));

export default useValidationStore;
