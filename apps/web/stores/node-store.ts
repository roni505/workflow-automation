import { create } from "zustand";
import { Node, Edge } from "@xyflow/react";

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

export interface EdgeState<T = any> {
  id: string;
  source: string;
  target: string;
  type: string;
  sourceHandle: string;
  targetHandle: string;
}

// interface for nodeState
interface NodesState {
  iNodes: NodeData[];
  iEdge: Edge[];
  addEdge: (edge: Edge) => void;
  setNode?: (node: Node) => void;
  addNode: (node: NodeData) => void;
  updatesNode?: (id: string, updates: Partial<NodeData>) => void;
  removeNode?: (id: string) => void;
}

export const useNodeStore = create<NodesState>((set) => ({
  iEdge: [],
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

  addEdge: (edge) =>
    set((state) => ({
      iEdge: [...state.iEdge, edge],
    })),
}));
