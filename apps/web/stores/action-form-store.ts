import { create } from "zustand";

export interface ActionFormType {
  isActionAdded: boolean;
  setIsActionAdded: (value: boolean) => void;
}

export const useActionFormStore = create<ActionFormType>((set) => ({
  isActionAdded: false,
  setIsActionAdded: (value: boolean) => set({ isActionAdded: value }),
}));
