import { create } from "zustand";
import { WorkFlow } from "@repo/types/workflow";

export interface WorkflowStateType {
  savedWorkflow: WorkFlow[];
  // savedWorkflow: WorkFlow | null;

  setWorkflow: (data: WorkFlow[]) => void;
}

export const useAllWorkflowStore = create<WorkflowStateType>((set) => ({
  savedWorkflow: [],

  setWorkflow: (data) =>
    set(() => ({
      savedWorkflow: data,
    })),
}));
