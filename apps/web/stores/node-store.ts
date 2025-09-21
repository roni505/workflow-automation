import { create } from "zustand";

// interface for nodeData
interface NodeData {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    value: number;
  };
}

// interface for nodeState
interface NodesState {
  iNodes: NodeData[];
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
    },
  ],
  addNode: (node) =>
    set((state) => ({
      iNodes: [...state.iNodes, node],
    })),
}));
