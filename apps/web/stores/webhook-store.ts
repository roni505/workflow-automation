import { create } from "zustand";

interface WebhookStateType {
  webhook: string;
  //   deleteWebhook: (id: string) => void;
  setWebhook: (data: string) => void;
}

export const useWebhookStore = create<WebhookStateType>((set) => ({
  webhook: "",

  // Delete a webhook by ID
  //   deleteWebhook: (id) =>
  //     set((state) => ({
  //       webhooks: state.webhooks.filter((webhook) => webhook.id !== id),
  //     })),

  // Replace the entire webhook list
  setWebhook: (data) =>
    set(() => ({
      webhook: data,
    })),
}));
