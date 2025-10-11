import axios from "axios";
import { Credentials } from "@repo/types/workflow";
import { create, createStore } from "zustand";

export interface CredentialsState {
  credentialData: Credentials[];
  fetchCredentails: () => Promise<void>;
  addCredentails: (newCredentails: Credentials) => void;
}

export const useCredentialsStore = create<CredentialsState>((set) => ({
  credentialData: [],

  fetchCredentails: async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v0/get-credentials",
      );
      console.log(res.data.credentailData);

      set({ credentialData: res.data.credentailData });
    } catch (error) {
      console.error("Credentails fetching failed ", error);
    }
  },
  addCredentails: (newCredentails) =>
    set((state) => ({
      credentialData: [...state.credentialData, newCredentails],
    })),
}));
