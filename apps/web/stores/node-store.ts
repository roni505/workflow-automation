import { create } from "zustand";

// interface for nodeData
export interface NodeData<T = any> {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: T;
  actionData: any;
}

// interface for nodeState
interface NodesState {
  iNodes: NodeData[];
  setNode?: (node: any) => void;
  addNode: (node: NodeData) => void;
  updatesNode?: (id: string, updates: Partial<NodeData>) => void;
  removeNode?: (id: string) => void;
}

export const useNodeStore = create<NodesState>((set) => ({
  iNodes: [
    {
      id: "node-1",
      type: "manualNode",
      position: { x: 0, y: 0 },
      data: { value: 123 },
      actionData: "",
    },
  ],
  setNode: (updater: any) =>
    set((state) => ({
      iNodes: typeof updater === "function" ? updater(state.iNodes) : updater,
    })),
  addNode: (node) =>
    set((state) => ({
      iNodes: [...state.iNodes, node],
    })),
}));
