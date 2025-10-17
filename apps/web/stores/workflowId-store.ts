import { create } from "zustand";
import { WorkFlow } from "@repo/types/workflow";

export interface WorkflowStateType {
  savedWorkflowId: WorkFlow | null;
  setWorkflowId: (data: WorkFlow) => void;
}

export const useWorkflowIdStore = create<WorkflowStateType>((set) => ({
  savedWorkflowId: null,

  setWorkflowId: (data) =>
    set(() => ({
      savedWorkflowId: data,
    })),
}));
