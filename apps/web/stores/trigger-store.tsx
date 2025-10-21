import { create } from "zustand";

type TriggerType = {
  trigger: "manual" | "webhook" | null;
  setTrigger: (type: "webhook" | "manual") => void;
};

export const useTriggerStore = create<TriggerType>((set) => ({
  trigger: null,

  setTrigger: (type) =>
    set({
      trigger: type,
    }),
}));
