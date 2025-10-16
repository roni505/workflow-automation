import { create } from "zustand";
import { WorkFlow } from "@repo/types/workflow";

export interface WorkflowStateType {
  savedWorkflow: WorkFlow | null;
  setWorkflow: (data: WorkFlow) => void;
}

export const useWorkflowStore = create<WorkflowStateType>((set) => ({
  savedWorkflow: null,

  setWorkflow: (data) =>
    set(() => ({
      savedWorkflow: data,
    })),
}));
