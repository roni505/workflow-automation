import { create } from "zustand";
import { WorkFlow } from "@repo/types/workflow";

export interface WorkflowStateType {
  savedWorkflow: WorkFlow[];
  setWorkflow: (data: WorkFlow[]) => void;
  deleteWorkflow: (id: number) => void;
}

export const useAllWorkflowStore = create<WorkflowStateType>((set) => ({
  savedWorkflow: [],

  deleteWorkflow: (id) =>
    set((state) => ({
      savedWorkflow: state.savedWorkflow.filter(
        (workflow) => workflow.id !== id,
      ),
    })),

  setWorkflow: (data) =>
    set(() => ({
      savedWorkflow: data,
    })),
}));
